import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;

    const questionCommand = new GetCommand({
        TableName: `Question-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        Key: {
            id: questionId,
        },
    });
    const fetchQuestion = docClient.send(questionCommand);

    const answersCommand = new ScanCommand({
        TableName: `Answer-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        FilterExpression: "questionId = :questionId",
        ExpressionAttributeValues: {
            ":questionId": questionId,
        },
    });
    const fetchAnswers = await docClient.send(answersCommand);

    const [questionResponse, answersResponse] = await Promise.all([fetchQuestion, fetchAnswers]);
    const question = questionResponse.Item;
    const answers = answersResponse.Items;

    const now = new Date().getTime();
    const closeTime = new Date(question.closeTime).getTime();
    const isClosed = now >= closeTime;

    if (!isClosed) {
        throw new Error("Question not closed yet!");
    }
    return answers.map(a => ({
        id: a.id,
        player: a.player,
    }));
};
