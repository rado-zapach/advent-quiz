import crypto from "@aws-crypto/sha256-js";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {default as fetch, Request} from "node-fetch";

const {Sha256} = crypto;
const GRAPHQL_ENDPOINT = process.env.API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const findQuery = questionId => /* GraphQL */ `
  query MyQuery {
    getQuestion(id: "${questionId}") {
      id
      text
      choices
      icon
      correctAnswer
      openTime
      closeTime
      winner
    }
  }
`;

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

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;
    const question = await MakeRequest(findQuery(questionId));
    const i = question.data.getQuestion;

    const now = new Date().getTime();
    const openTime = new Date(i.openTime).getTime();
    if (now >= openTime) {
        const closeTime = new Date(i.closeTime).getTime();
        if (now < closeTime) {
            return {
                id: i.id,
                icon: i.icon,
                openTime: i.openTime,
                closeTime: i.closeTime,
                text: i.text,
                choices: i.choices,
            };
        }
        return {
            id: i.id,
            icon: i.icon,
            openTime: i.openTime,
            closeTime: i.closeTime,
            text: i.text,
            choices: i.choices,
            correctAnswer: i.correctAnswer,
            winner: i.winner,
        };
    }
    return {
        id: i.id,
        icon: i.icon,
        openTime: i.openTime,
        closeTime: i.closeTime,
    };
};
