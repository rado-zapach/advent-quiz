/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateQuestion = /* GraphQL */ `subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onCreateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuestionSubscriptionVariables,
  APITypes.OnCreateQuestionSubscription
>;
export const onUpdateQuestion = /* GraphQL */ `subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onUpdateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionSubscriptionVariables,
  APITypes.OnUpdateQuestionSubscription
>;
export const onDeleteQuestion = /* GraphQL */ `subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onDeleteQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionSubscriptionVariables,
  APITypes.OnDeleteQuestionSubscription
>;
export const onCreateAnswer = /* GraphQL */ `subscription OnCreateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
  onCreateAnswer(filter: $filter) {
    id
    player
    text
    isCorrect
    points
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAnswerSubscriptionVariables,
  APITypes.OnCreateAnswerSubscription
>;
export const onUpdateAnswer = /* GraphQL */ `subscription OnUpdateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
  onUpdateAnswer(filter: $filter) {
    id
    player
    text
    isCorrect
    points
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAnswerSubscriptionVariables,
  APITypes.OnUpdateAnswerSubscription
>;
export const onDeleteAnswer = /* GraphQL */ `subscription OnDeleteAnswer($filter: ModelSubscriptionAnswerFilterInput) {
  onDeleteAnswer(filter: $filter) {
    id
    player
    text
    isCorrect
    points
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAnswerSubscriptionVariables,
  APITypes.OnDeleteAnswerSubscription
>;
