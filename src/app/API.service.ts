/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  owner?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  owner?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
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

export type Todo = {
  __typename: "Todo",
  id: string,
  owner?: string | null,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  owner?: string | null,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

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
  owner?: string | null,
  text: string,
  isCorrect: boolean,
  points: number,
  question: Question,
  createdAt: string,
  updatedAt: string,
  questionAnswersId: string,
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
  owner?: string | null,
  text: string,
  isCorrect: boolean,
  points: number,
  questionAnswersId: string,
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

export type CreateRankingInput = {
  id?: string | null,
  user: string,
  points: number,
  correctAnswers: number,
  allAnswers: number,
};

export type ModelRankingConditionInput = {
  user?: ModelStringInput | null,
  points?: ModelIntInput | null,
  correctAnswers?: ModelIntInput | null,
  allAnswers?: ModelIntInput | null,
  and?: Array< ModelRankingConditionInput | null > | null,
  or?: Array< ModelRankingConditionInput | null > | null,
  not?: ModelRankingConditionInput | null,
};

export type Ranking = {
  __typename: "Ranking",
  id: string,
  user: string,
  points: number,
  correctAnswers: number,
  allAnswers: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRankingInput = {
  id: string,
  user?: string | null,
  points?: number | null,
  correctAnswers?: number | null,
  allAnswers?: number | null,
};

export type DeleteRankingInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
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

export type ModelRankingFilterInput = {
  id?: ModelIDInput | null,
  user?: ModelStringInput | null,
  points?: ModelIntInput | null,
  correctAnswers?: ModelIntInput | null,
  allAnswers?: ModelIntInput | null,
  and?: Array< ModelRankingFilterInput | null > | null,
  or?: Array< ModelRankingFilterInput | null > | null,
  not?: ModelRankingFilterInput | null,
};

export type ModelRankingConnection = {
  __typename: "ModelRankingConnection",
  items:  Array<Ranking | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
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

export type ModelSubscriptionRankingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user?: ModelSubscriptionStringInput | null,
  points?: ModelSubscriptionIntInput | null,
  correctAnswers?: ModelSubscriptionIntInput | null,
  allAnswers?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionRankingFilterInput | null > | null,
  or?: Array< ModelSubscriptionRankingFilterInput | null > | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
  } | null,
};

export type CreateRankingMutationVariables = {
  input: CreateRankingInput,
  condition?: ModelRankingConditionInput | null,
};

export type CreateRankingMutation = {
  createRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRankingMutationVariables = {
  input: UpdateRankingInput,
  condition?: ModelRankingConditionInput | null,
};

export type UpdateRankingMutation = {
  updateRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRankingMutationVariables = {
  input: DeleteRankingInput,
  condition?: ModelRankingConditionInput | null,
};

export type DeleteRankingMutation = {
  deleteRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      owner?: string | null,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
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
      owner?: string | null,
      text: string,
      isCorrect: boolean,
      points: number,
      createdAt: string,
      updatedAt: string,
      questionAnswersId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRankingQueryVariables = {
  id: string,
};

export type GetRankingQuery = {
  getRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRankingsQueryVariables = {
  filter?: ModelRankingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRankingsQuery = {
  listRankings?:  {
    __typename: "ModelRankingConnection",
    items:  Array< {
      __typename: "Ranking",
      id: string,
      user: string,
      points: number,
      correctAnswers: number,
      allAnswers: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
  owner?: string | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    owner?: string | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
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
    owner?: string | null,
    text: string,
    isCorrect: boolean,
    points: number,
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
    questionAnswersId: string,
  } | null,
};

export type OnCreateRankingSubscriptionVariables = {
  filter?: ModelSubscriptionRankingFilterInput | null,
};

export type OnCreateRankingSubscription = {
  onCreateRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRankingSubscriptionVariables = {
  filter?: ModelSubscriptionRankingFilterInput | null,
};

export type OnUpdateRankingSubscription = {
  onUpdateRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRankingSubscriptionVariables = {
  filter?: ModelSubscriptionRankingFilterInput | null,
};

export type OnDeleteRankingSubscription = {
  onDeleteRanking?:  {
    __typename: "Ranking",
    id: string,
    user: string,
    points: number,
    correctAnswers: number,
    allAnswers: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
