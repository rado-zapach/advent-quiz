/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTodo = /* GraphQL */ `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    owner
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      name
      description
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
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
export const getRanking = /* GraphQL */ `query GetRanking($id: ID!) {
  getRanking(id: $id) {
    id
    user
    points
    correctAnswers
    allAnswers
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRankingQueryVariables,
  APITypes.GetRankingQuery
>;
export const listRankings = /* GraphQL */ `query ListRankings(
  $filter: ModelRankingFilterInput
  $limit: Int
  $nextToken: String
) {
  listRankings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user
      points
      correctAnswers
      allAnswers
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRankingsQueryVariables,
  APITypes.ListRankingsQuery
>;
