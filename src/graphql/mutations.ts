/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const playerSaveAnswer = /* GraphQL */ `mutation PlayerSaveAnswer($questionId: String!, $text: String!) {
  playerSaveAnswer(questionId: $questionId, text: $text)
}
` as GeneratedMutation<
  APITypes.PlayerSaveAnswerMutationVariables,
  APITypes.PlayerSaveAnswerMutation
>;
export const createQuestion = /* GraphQL */ `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateQuestionMutationVariables,
  APITypes.CreateQuestionMutation
>;
export const updateQuestion = /* GraphQL */ `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateQuestionMutationVariables,
  APITypes.UpdateQuestionMutation
>;
export const deleteQuestion = /* GraphQL */ `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteQuestionMutationVariables,
  APITypes.DeleteQuestionMutation
>;
export const createAnswer = /* GraphQL */ `mutation CreateAnswer(
  $input: CreateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  createAnswer(input: $input, condition: $condition) {
    id
    player
    text
    isCorrect
    points
    questionId
    createdAt
    updatedAt
    questionAnswersId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAnswerMutationVariables,
  APITypes.CreateAnswerMutation
>;
export const updateAnswer = /* GraphQL */ `mutation UpdateAnswer(
  $input: UpdateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  updateAnswer(input: $input, condition: $condition) {
    id
    player
    text
    isCorrect
    points
    questionId
    createdAt
    updatedAt
    questionAnswersId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAnswerMutationVariables,
  APITypes.UpdateAnswerMutation
>;
export const deleteAnswer = /* GraphQL */ `mutation DeleteAnswer(
  $input: DeleteAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  deleteAnswer(input: $input, condition: $condition) {
    id
    player
    text
    isCorrect
    points
    questionId
    createdAt
    updatedAt
    questionAnswersId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAnswerMutationVariables,
  APITypes.DeleteAnswerMutation
>;
