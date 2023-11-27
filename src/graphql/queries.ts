/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../app/API.service';
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
` as GeneratedQuery<APITypes.GetQuestionQueryVariables, APITypes.GetQuestionQuery>;
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
` as GeneratedQuery<APITypes.ListQuestionsQueryVariables, APITypes.ListQuestionsQuery>;
export const getAnswer = /* GraphQL */ `query GetAnswer($id: ID!) {
  getAnswer(id: $id) {
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
      saveTime
      questionId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListAnswersQueryVariables, APITypes.ListAnswersQuery>;
export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
    id
    text
    channel
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetChatMessageQueryVariables, APITypes.GetChatMessageQuery>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      channel
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListChatMessagesQueryVariables, APITypes.ListChatMessagesQuery>;
export const chatMessagesByChannelAndCreatedAt = /* GraphQL */ `query ChatMessagesByChannelAndCreatedAt(
  $channel: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  chatMessagesByChannelAndCreatedAt(
    channel: $channel
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      channel
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ChatMessagesByChannelAndCreatedAtQueryVariables,
    APITypes.ChatMessagesByChannelAndCreatedAtQuery
>;
export const getRules = /* GraphQL */ `query GetRules($id: ID!) {
  getRules(id: $id) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRulesQueryVariables, APITypes.GetRulesQuery>;
export const listRules = /* GraphQL */ `query ListRules(
  $filter: ModelRulesFilterInput
  $limit: Int
  $nextToken: String
) {
  listRules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRulesQueryVariables, APITypes.ListRulesQuery>;
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
` as GeneratedQuery<APITypes.PlayerQuestionListQueryVariables, APITypes.PlayerQuestionListQuery>;
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
` as GeneratedQuery<APITypes.PlayerQuestionQueryVariables, APITypes.PlayerQuestionQuery>;
export const playerAnswerList = /* GraphQL */ `query PlayerAnswerList($questionId: ID!) {
  playerAnswerList(questionId: $questionId) {
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
` as GeneratedQuery<APITypes.PlayerAnswerListQueryVariables, APITypes.PlayerAnswerListQuery>;
export const playerAnswer = /* GraphQL */ `query PlayerAnswer($questionId: ID!) {
  playerAnswer(questionId: $questionId) {
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
` as GeneratedQuery<APITypes.PlayerAnswerQueryVariables, APITypes.PlayerAnswerQuery>;
export const playerAttributesList = /* GraphQL */ `query PlayerAttributesList {
  playerAttributesList {
    username
    email
    __typename
  }
}
` as GeneratedQuery<APITypes.PlayerAttributesListQueryVariables, APITypes.PlayerAttributesListQuery>;
export const ranking = /* GraphQL */ `query Ranking {
  ranking {
    player
    points
    correctAnswers
    allQuestions
    __typename
  }
}
` as GeneratedQuery<APITypes.RankingQueryVariables, APITypes.RankingQuery>;
