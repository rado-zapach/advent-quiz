/* Amplify Params - DO NOT EDIT
	API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT
	API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async event => {
    const command = new GetCommand({
        TableName: `Question-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        Key: {
            id: "f7fd41b3-b867-454a-bae3-20ef24b7a738",
        },
    });

    const response = await docClient.send(command);
    return response.Item;
};
