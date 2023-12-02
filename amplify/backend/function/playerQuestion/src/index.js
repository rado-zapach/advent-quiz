import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;

    const command = new GetCommand({
        TableName: `Question-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        Key: {
            id: questionId,
        },
    });
    const response = await docClient.send(command);
    const i = response.Item;

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
