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

const findQuery = () => /* GraphQL */ `
  query MyQuery {
    listAnswers(filter: {points: {gt: 0}}, limit: 1000000) {
      items {
        player
        points
        questionId
      }
    }
    listQuestions(filter: {closeTime: {le: "${new Date().toISOString()}"}}, limit: 1000000) {
      items {
        id
      }
    }
  }
`;

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const rankings = {};
    const player = event.identity.username;
    const result = await MakeRequest(findQuery());
    const answers = result.data.listAnswers.items;
    const questions = result.data.listQuestions.items;

    answers
        .filter(a => questions.some(q => q.id === a.questionId))
        .forEach(a => {
            const r = rankings[a.player];
            if (r) {
                r.points += a.points;
                r.correctAnswers += 1;
            } else {
                rankings[a.player] = {
                    points: a.points,
                    correctAnswers: 1,
                };
            }
        });

    return Object.entries(rankings).map(([answerPlayer, ranking]) => ({
        player: player === answerPlayer ? player : null,
        points: ranking.points,
        correctAnswers: ranking.correctAnswers,
        allQuestions: questions.length,
    }));
};
