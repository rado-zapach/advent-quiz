import {Sha256} from "@aws-crypto/sha256-js";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {HttpRequest} from "@aws-sdk/protocol-http";

const GRAPHQL_ENDPOINT = process.env.API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const endpoint = new URL(GRAPHQL_ENDPOINT);
const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
});

async function MakeRequest(query) {
    const requestToBeSigned = new HttpRequest({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            host: endpoint.host,
        },
        hostname: endpoint.host,
        body: JSON.stringify({query}),
        path: endpoint.pathname,
    });
    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(GRAPHQL_ENDPOINT, signed);
    const response = await fetch(request);
    return await response.json();
}

const findQuery = (questionId, player) => /* GraphQL */ `
  query MyQuery {
    listAnswers(filter: {questionId: {eq: "${questionId}"}, and: {player: {eq: "${player}"}}}) {
      items {
        id
        player
        text
        isCorrect
        points
        questionId
        createdAt
        updatedAt
      }
    }
    getQuestion(id: "${questionId}") {
      closeTime
    }
  }
`;

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;
    const player = event.identity.username;
    const answersAndQuestion = await MakeRequest(findQuery(questionId, player));
    const answers = answersAndQuestion.data.listAnswers.items;
    const question = answersAndQuestion.data.getQuestion;

    const now = new Date().getTime();
    const closeTime = new Date(question.closeTime).getTime();
    const isClosed = now >= closeTime;

    if (answers.length > 1) {
        throw new Error("Too many answers!");
    }
    if (answers.length <= 0) {
        return null;
    }
    const a = answers[0];

    return {
        id: a.id,
        player: a.player,
        text: a.text,
        isCorrect: isClosed ? a.isCorrect : null,
        points: isClosed ? a.points : null,
        questionId: a.questionId,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
    };
};
