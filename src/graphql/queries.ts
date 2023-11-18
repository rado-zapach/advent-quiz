/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const playerQuestionList = /* GraphQL */ `query PlayerQuestionList {
  playerQuestionList {
    id
    text
    choices
    icon
    correctAnswer
    openTime
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerQuestionListQueryVariables,
  APITypes.PlayerQuestionListQuery
>;
export const getQuestion = /* GraphQL */ `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    id
    text
    choices
    icon
    correctAnswer
    openTime
    closeTime
    answers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionQueryVariables,
  APITypes.GetQuestionQuery
>;
export const listQuestions = /* GraphQL */ `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      choices
      icon
      correctAnswer
      openTime
      closeTime
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionsQueryVariables,
  APITypes.ListQuestionsQuery
>;
export const getAnswer = /* GraphQL */ `query GetAnswer($id: ID!) {
  getAnswer(id: $id) {
    id
    owner
    text
    isCorrect
    points
    question {
      id
      text
      choices
      icon
      correctAnswer
      openTime
      closeTime
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    questionAnswersId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAnswerQueryVariables, APITypes.GetAnswerQuery>;
export const listAnswers = /* GraphQL */ `query ListAnswers(
  $filter: ModelAnswerFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      text
      isCorrect
      points
      createdAt
      updatedAt
      questionAnswersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAnswersQueryVariables,
  APITypes.ListAnswersQuery
>;
