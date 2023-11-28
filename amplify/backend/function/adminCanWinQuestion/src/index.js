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
        isCorrect
      }
    }
  }
`;

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;
    const username = event.arguments.username;

    const result = await MakeRequest(findQuery(questionId, username));
    const answers = result.data.listAnswers.items;

    if (answers.length <= 0) {
        return false;
    }
    if (answers.length > 1) {
        answers.sort((a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime());
    }
    const a = answers[0];
    // convert null to false
    return a.isCorrect ? a.isCorrect : false;
};
