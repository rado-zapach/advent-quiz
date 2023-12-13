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
        body: JSON.stringify(query),
        path: endpoint.pathname,
    });
    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(GRAPHQL_ENDPOINT, signed);
    const response = await fetch(request);
    return await response.json();
}

const updateQuery = (questionId, username) => ({
    query: /* GraphQL */ `
        mutation MyMutation($questionId: ID!, $username: String!) {
            updateQuestion(input: {id: $questionId, winner: $username}) {
                id
            }
        }
    `,
    variables: {
        questionId,
        username,
    },
});

export const handler = async event => {
    const questionId = event.arguments.questionId;
    const username = event.arguments.username;

    const result = await MakeRequest(updateQuery(questionId, username));
    return result.data.updateQuestion.id;
};
