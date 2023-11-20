/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getQuestion = /* GraphQL */ `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
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
    player
    text
    isCorrect
    points
    questionId
    createdAt
    updatedAt
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
      player
      text
      isCorrect
      points
      questionId
      createdAt
      updatedAt
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
export const playerQuestionList = /* GraphQL */ `query PlayerQuestionList {
  playerQuestionList {
    id
    text
    choices
    icon
    correctAnswer
    openTime
    closeTime
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerQuestionListQueryVariables,
  APITypes.PlayerQuestionListQuery
>;
export const playerQuestion = /* GraphQL */ `query PlayerQuestion($questionId: ID!) {
  playerQuestion(questionId: $questionId) {
    id
    text
    choices
    icon
    correctAnswer
    openTime
    closeTime
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerQuestionQueryVariables,
  APITypes.PlayerQuestionQuery
>;
export const playerAnswerList = /* GraphQL */ `query PlayerAnswerList($questionId: ID!) {
  playerAnswerList(questionId: $questionId) {
    id
    player
    text
    isCorrect
    points
    questionId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerAnswerListQueryVariables,
  APITypes.PlayerAnswerListQuery
>;
export const playerAnswer = /* GraphQL */ `query PlayerAnswer($questionId: ID!) {
  playerAnswer(questionId: $questionId) {
    id
    player
    text
    isCorrect
    points
    questionId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerAnswerQueryVariables,
  APITypes.PlayerAnswerQuery
>;
export const playerAttributesList = /* GraphQL */ `query PlayerAttributesList {
  playerAttributesList {
    username
    email
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerAttributesListQueryVariables,
  APITypes.PlayerAttributesListQuery
>;
