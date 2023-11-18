/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  choices: string,
  icon: string,
  correctAnswer: string,
  openTime: string,
  closeTime: string,
};

export type ModelQuestionConditionInput = {
  text?: ModelStringInput | null,
  choices?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  correctAnswer?: ModelStringInput | null,
  openTime?: ModelStringInput | null,
  closeTime?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Question = {
  __typename: "Question",
  id: string,
  text: string,
  choices: string,
  icon: string,
  correctAnswer: string,
  openTime: string,
  closeTime: string,
  answers?: ModelAnswerConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAnswerConnection = {
  __typename: "ModelAnswerConnection",
  items:  Array<Answer | null >,
  nextToken?: string | null,
};

export type Answer = {
  __typename: "Answer",
  id: string,
  owner: string,
  text: string,
  isCorrect?: boolean | null,
  points?: number | null,
  question: Question,
  createdAt: string,
  updatedAt: string,
  questionAnswersId?: string | null,
};

export type UpdateQuestionInput = {
  id: string,
  text?: string | null,
  choices?: string | null,
  icon?: string | null,
  correctAnswer?: string | null,
  openTime?: string | null,
  closeTime?: string | null,
};

export type DeleteQuestionInput = {
  id: string,
};

export type CreateAnswerInput = {
  id?: string | null,
  owner: string,
  text: string,
  isCorrect?: boolean | null,
  points?: number | null,
  questionAnswersId?: string | null,
};

export type ModelAnswerConditionInput = {
  owner?: ModelStringInput | null,
  text?: ModelStringInput | null,
  isCorrect?: ModelBooleanInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelAnswerConditionInput | null > | null,
  or?: Array< ModelAnswerConditionInput | null > | null,
  not?: ModelAnswerConditionInput | null,
  questionAnswersId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateAnswerInput = {
  id: string,
  owner?: string | null,
  text?: string | null,
  isCorrect?: boolean | null,
  points?: number | null,
  questionAnswersId?: string | null,
};

export type DeleteAnswerInput = {
  id: string,
};

export type PlayerQuestion = {
  __typename: "PlayerQuestion",
  id: string,
  text?: string | null,
  choices?: string | null,
  icon: string,
  correctAnswer?: string | null,
  openTime: string,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  choices?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  correctAnswer?: ModelStringInput | null,
  openTime?: ModelStringInput | null,
  closeTime?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelQuestionConnection = {
  __typename: "ModelQuestionConnection",
  items:  Array<Question | null >,
  nextToken?: string | null,
};

export type ModelAnswerFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  text?: ModelStringInput | null,
  isCorrect?: ModelBooleanInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelAnswerFilterInput | null > | null,
  or?: Array< ModelAnswerFilterInput | null > | null,
  not?: ModelAnswerFilterInput | null,
  questionAnswersId?: ModelIDInput | null,
};

export type ModelSubscriptionQuestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  choices?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  correctAnswer?: ModelSubscriptionStringInput | null,
  openTime?: ModelSubscriptionStringInput | null,
  closeTime?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAnswerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  isCorrect?: ModelSubscriptionBooleanInput | null,
  points?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionAnswerFilterInput | null > | null,
  or?: Array< ModelSubscriptionAnswerFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAnswerMutationVariables = {
  input: CreateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type CreateAnswerMutation = {
  createAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type UpdateAnswerMutationVariables = {
  input: UpdateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type UpdateAnswerMutation = {
  updateAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type DeleteAnswerMutationVariables = {
  input: DeleteAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type DeleteAnswerMutation = {
  deleteAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type PlayerQuestionListQueryVariables = {
};

export type PlayerQuestionListQuery = {
  playerQuestionList:  Array< {
    __typename: "PlayerQuestion",
    id: string,
    text?: string | null,
    choices?: string | null,
    icon: string,
    correctAnswer?: string | null,
    openTime: string,
  } >,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAnswerQueryVariables = {
  id: string,
};

export type GetAnswerQuery = {
  getAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type ListAnswersQueryVariables = {
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnswersQuery = {
  listAnswers?:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      owner: string,
      text: string,
      isCorrect?: boolean | null,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
      questionAnswersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion?:  {
    __typename: "Question",
    id: string,
    text: string,
    choices: string,
    icon: string,
    correctAnswer: string,
    openTime: string,
    closeTime: string,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnCreateAnswerSubscription = {
  onCreateAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type OnUpdateAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAnswerSubscription = {
  onUpdateAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};

export type OnDeleteAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAnswerSubscription = {
  onDeleteAnswer?:  {
    __typename: "Answer",
    id: string,
    owner: string,
    text: string,
    isCorrect?: boolean | null,
    points?: number | null,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      choices: string,
      icon: string,
      correctAnswer: string,
      openTime: string,
      closeTime: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    questionAnswersId?: string | null,
  } | null,
};
