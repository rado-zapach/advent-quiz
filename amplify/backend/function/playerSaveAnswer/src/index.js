/* Amplify Params - DO NOT EDIT
	API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT
	API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from "@aws-crypto/sha256-js";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {HttpRequest} from "@aws-sdk/protocol-http";

const {Sha256} = crypto;
const GRAPHQL_ENDPOINT = process.env.API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const findQuery = (questionId, player) => /* GraphQL */ `
    query MyQuery {
        listAnswers(filter: {questionId: {eq: "${questionId}"}, and: {player: {eq: "${player}"}}}) {
            items {
                id
            }
        }
        getQuestion(id: "${questionId}") {
          openTime
          closeTime
        }
    }
`;
const createQuery = (player, text, questionId) => /* GraphQL */ `
    mutation MyMutation {
      createAnswer(input: {player: "${player}", text: "${text}", questionId: "${questionId}"}) {
        id
      }
    }
  `;
const updateQuery = (answerId, text) => /* GraphQL */ `
  mutation MyMutation {
    updateAnswer(input: {id: "${answerId}", text: "${text}"}) {
      id
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
    const text = event.arguments.text;
    const player = event.identity.username;

    const answersAndQuestion = await MakeRequest(findQuery(questionId, player));
    const answers = answersAndQuestion.data.listAnswers.items;
    const question = answersAndQuestion.data.getQuestion;

    const now = new Date().getTime();
    const openTime = new Date(question.openTime).getTime();
    const closeTime = new Date(question.closeTime).getTime();

    if (now < openTime || now > closeTime) {
        throw new Error(`Question is not open!`);
    }

    if (answers.length <= 0) {
        const id = await MakeRequest(createQuery(player, text, questionId));
        return id.data.createAnswer.id;
    }

    if (answers.length > 1) {
        answers.sort((a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime());
    }
    const answerId = answers[0].id;
    const id = await MakeRequest(updateQuery(answerId, text));
    return id.data.updateAnswer.id;
};
