/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../app/API.service';
type GeneratedMutation<InputType, OutputType> = string & {
    __generatedMutationInput: InputType;
    __generatedMutationOutput: OutputType;
};

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
    winner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateQuestionMutationVariables, APITypes.CreateQuestionMutation>;
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
    winner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateQuestionMutationVariables, APITypes.UpdateQuestionMutation>;
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
    winner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteQuestionMutationVariables, APITypes.DeleteQuestionMutation>;
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
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateAnswerMutationVariables, APITypes.CreateAnswerMutation>;
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
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateAnswerMutationVariables, APITypes.UpdateAnswerMutation>;
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
    saveTime
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteAnswerMutationVariables, APITypes.DeleteAnswerMutation>;
export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $input: CreateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  createChatMessage(input: $input, condition: $condition) {
    id
    text
    channel
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateChatMessageMutationVariables, APITypes.CreateChatMessageMutation>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $input: UpdateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  updateChatMessage(input: $input, condition: $condition) {
    id
    text
    channel
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateChatMessageMutationVariables, APITypes.UpdateChatMessageMutation>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $input: DeleteChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  deleteChatMessage(input: $input, condition: $condition) {
    id
    text
    channel
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteChatMessageMutationVariables, APITypes.DeleteChatMessageMutation>;
export const createRules = /* GraphQL */ `mutation CreateRules(
  $input: CreateRulesInput!
  $condition: ModelRulesConditionInput
) {
  createRules(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateRulesMutationVariables, APITypes.CreateRulesMutation>;
export const updateRules = /* GraphQL */ `mutation UpdateRules(
  $input: UpdateRulesInput!
  $condition: ModelRulesConditionInput
) {
  updateRules(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateRulesMutationVariables, APITypes.UpdateRulesMutation>;
export const deleteRules = /* GraphQL */ `mutation DeleteRules(
  $input: DeleteRulesInput!
  $condition: ModelRulesConditionInput
) {
  deleteRules(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteRulesMutationVariables, APITypes.DeleteRulesMutation>;
export const playerSaveAnswer =
    /* GraphQL */ `mutation PlayerSaveAnswer($questionId: ID!, $text: String!) {
  playerSaveAnswer(questionId: $questionId, text: $text) {
    id
    player
    text
    isCorrect
    points
    saveTime
    questionId
    __typename
  }
}
` as GeneratedMutation<APITypes.PlayerSaveAnswerMutationVariables, APITypes.PlayerSaveAnswerMutation>;
export const adminSaveWinner =
    /* GraphQL */ `mutation AdminSaveWinner($questionId: ID!, $username: String!) {
  adminSaveWinner(questionId: $questionId, username: $username)
}
` as GeneratedMutation<APITypes.AdminSaveWinnerMutationVariables, APITypes.AdminSaveWinnerMutation>;
