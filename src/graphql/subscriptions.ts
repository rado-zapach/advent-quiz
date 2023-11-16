/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../app/API.service";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onCreateTodo(filter: $filter, owner: $owner) {
    id
    owner
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onUpdateTodo(filter: $filter, owner: $owner) {
    id
    owner
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onDeleteTodo(filter: $filter, owner: $owner) {
    id
    owner
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onCreateQuestion = /* GraphQL */ `subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onCreateQuestion(filter: $filter) {
    id
    text
    choices
    icon
    correctAnswer
    openTime
    closeTime
    showAnswer
    answers {
      nextToken
      __typename
    }
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
    showAnswer
    answers {
      nextToken
      __typename
    }
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
    showAnswer
    answers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionSubscriptionVariables,
  APITypes.OnDeleteQuestionSubscription
>;
export const onCreateAnswer = /* GraphQL */ `subscription OnCreateAnswer(
  $filter: ModelSubscriptionAnswerFilterInput
  $owner: String
) {
  onCreateAnswer(filter: $filter, owner: $owner) {
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
      showAnswer
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
` as GeneratedSubscription<
  APITypes.OnCreateAnswerSubscriptionVariables,
  APITypes.OnCreateAnswerSubscription
>;
export const onUpdateAnswer = /* GraphQL */ `subscription OnUpdateAnswer(
  $filter: ModelSubscriptionAnswerFilterInput
  $owner: String
) {
  onUpdateAnswer(filter: $filter, owner: $owner) {
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
      showAnswer
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
` as GeneratedSubscription<
  APITypes.OnUpdateAnswerSubscriptionVariables,
  APITypes.OnUpdateAnswerSubscription
>;
export const onDeleteAnswer = /* GraphQL */ `subscription OnDeleteAnswer(
  $filter: ModelSubscriptionAnswerFilterInput
  $owner: String
) {
  onDeleteAnswer(filter: $filter, owner: $owner) {
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
      showAnswer
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
` as GeneratedSubscription<
  APITypes.OnDeleteAnswerSubscriptionVariables,
  APITypes.OnDeleteAnswerSubscription
>;
export const onCreateRanking = /* GraphQL */ `subscription OnCreateRanking($filter: ModelSubscriptionRankingFilterInput) {
  onCreateRanking(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRankingSubscriptionVariables,
  APITypes.OnCreateRankingSubscription
>;
export const onUpdateRanking = /* GraphQL */ `subscription OnUpdateRanking($filter: ModelSubscriptionRankingFilterInput) {
  onUpdateRanking(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRankingSubscriptionVariables,
  APITypes.OnUpdateRankingSubscription
>;
export const onDeleteRanking = /* GraphQL */ `subscription OnDeleteRanking($filter: ModelSubscriptionRankingFilterInput) {
  onDeleteRanking(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRankingSubscriptionVariables,
  APITypes.OnDeleteRankingSubscription
>;
