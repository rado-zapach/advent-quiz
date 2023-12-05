import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, ScanCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const command = new ScanCommand({
        TableName: `Question-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        Limit: 1000000,
    });
    const result = await docClient.send(command);
    return result.Items.map(i => ({
        id: i.id,
        icon: i.icon,
        openTime: i.openTime,
        closeTime: i.closeTime,
    }));
};
