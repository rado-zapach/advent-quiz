import crypto from "@aws-crypto/sha256-js";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {default as fetch, Request} from "node-fetch";

const {Sha256} = crypto;
const GRAPHQL_ENDPOINT = process.env.API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

// TODO: pagination
// https://github.com/aws/aws-appsync-community/issues/53
const query = /* GraphQL */ `
    query LIST_QUESTIONS {
        listQuestions {
            items {
                id
                text
                choices
                icon
                correctAnswer
                openTime
                closeTime
            }
        }
    }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const endpoint = new URL(GRAPHQL_ENDPOINT);

    const signer = new SignatureV4({
        credentials: defaultProvider(),
        region: AWS_REGION,
        service: "appsync",
        sha256: Sha256,
    });

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
    const body = await response.json();
    const now = new Date().getTime();
    const items = body.data.listQuestions.items.map(i => {
        const openTime = new Date(i.openTime).getTime();
        if (now >= openTime) {
            const closeTime = new Date(i.closeTime).getTime();
            if (now < closeTime) {
                return {
                    id: i.id,
                    icon: i.icon,
                    openTime: i.openTime,
                    text: i.text,
                    choices: i.choices,
                };
            }
            return {
                id: i.id,
                icon: i.icon,
                openTime: i.openTime,
                text: i.text,
                choices: i.choices,
                correctAnswer: i.correctAnswer,
            };
        }
        return {
            id: i.id,
            icon: i.icon,
            openTime: i.openTime,
        };
    });

    // console.log(JSON.stringify(body.data.listQuestions.items, undefined, 2));
    return items;
};
