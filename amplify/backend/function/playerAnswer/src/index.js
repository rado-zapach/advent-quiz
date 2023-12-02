import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const questionId = event.arguments.questionId;
    const player = event.identity.username;

    const questionCommand = new GetCommand({
        TableName: `Question-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        Key: {
            id: questionId,
        },
    });
    const fetchQuestion = docClient.send(questionCommand);

    const answersCommand = new ScanCommand({
        TableName: `Answer-${process.env.API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
        FilterExpression: "questionId = :questionId and player = :player",
        ExpressionAttributeValues: {
            ":questionId": questionId,
            ":player": player,
        },
    });
    const fetchAnswers = await docClient.send(answersCommand);

    const [questionResponse, answersResponse] = await Promise.all([fetchQuestion, fetchAnswers]);
    const question = questionResponse.Item;
    const answers = answersResponse.Items;

    const now = new Date().getTime();
    const closeTime = new Date(question.closeTime).getTime();
    const isClosed = now >= closeTime;

    if (answers.length <= 0) {
        return null;
    }
    if (answers.length > 1) {
        answers.sort((a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime());
    }
    const a = answers[0];

    return {
        id: a.id,
        player: a.player,
        text: a.text,
        isCorrect: isClosed ? a.isCorrect : null,
        points: isClosed ? a.points : null,
        saveTime: a.saveTime,
        questionId: a.questionId,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
    };
};
