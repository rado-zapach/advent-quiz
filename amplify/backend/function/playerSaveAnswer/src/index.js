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

const findQuery = (questionId, player) => ({
    query: /* GraphQL */ `
        query MyQuery {
            listAnswers(filter: {questionId: {eq: "${questionId}"}, and: {player: {eq: "${player}"}}}) {
                items {
                    id
                }
            }
            getQuestion(id: "${questionId}") {
                correctAnswer
                openTime
                closeTime
            }
        }
    `,
});

const createQuery = (player, text, questionId, isCorrect) => ({
    query: /* GraphQL */ `
        mutation MyMutation(
            $player: String!
            $text: String!
            $questionId: String!
            $saveTime: AWSDateTime!
            $isCorrect: Boolean!
        ) {
            createAnswer(
                input: {
                    player: $player
                    text: $text
                    questionId: $questionId
                    saveTime: $saveTime
                    isCorrect: $isCorrect
                }
            ) {
                id
                player
                saveTime
            }
        }
    `,
    variables: {
        player,
        text,
        questionId,
        saveTime: new Date().toISOString(),
        isCorrect,
    },
});
const updateQuery = (answerId, text, isCorrect) => ({
    query: /* GraphQL */ `
        mutation MyMutation(
            $answerId: ID!
            $text: String!
            $saveTime: AWSDateTime!
            $isCorrect: Boolean!
        ) {
            updateAnswer(
                input: {id: $answerId, text: $text, saveTime: $saveTime, isCorrect: $isCorrect}
            ) {
                id
                player
                saveTime
            }
        }
    `,
    variables: {
        answerId,
        text,
        saveTime: new Date().toISOString(),
        isCorrect,
    },
});

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
    const isCorrect = question.correctAnswer.toLowerCase().trim() === text.toLowerCase().trim();

    if (answers.length <= 0) {
        const result = await MakeRequest(createQuery(player, text, questionId, isCorrect));
        return {
            id: result.data.createAnswer.id,
            player: result.data.createAnswer.player,
            saveTime: result.data.createAnswer.saveTime,
        };
    }

    if (answers.length > 1) {
        answers.sort((a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime());
    }
    const answerId = answers[0].id;
    const result = await MakeRequest(updateQuery(answerId, text, isCorrect));
    return {
        id: result.data.updateAnswer.id,
        player: result.data.updateAnswer.player,
        saveTime: result.data.updateAnswer.saveTime,
    };
};
