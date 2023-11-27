/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestionInput = {
    id?: string | null;
    text: string;
    choices: string;
    icon: string;
    correctAnswer: string;
    openTime: string;
    closeTime: string;
};

export type ModelQuestionConditionInput = {
    text?: ModelStringInput | null;
    choices?: ModelStringInput | null;
    icon?: ModelStringInput | null;
    correctAnswer?: ModelStringInput | null;
    openTime?: ModelStringInput | null;
    closeTime?: ModelStringInput | null;
    and?: Array<ModelQuestionConditionInput | null> | null;
    or?: Array<ModelQuestionConditionInput | null> | null;
    not?: ModelQuestionConditionInput | null;
};

export type ModelStringInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
    size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
    binary = 'binary',
    binarySet = 'binarySet',
    bool = 'bool',
    list = 'list',
    map = 'map',
    number = 'number',
    numberSet = 'numberSet',
    string = 'string',
    stringSet = 'stringSet',
    _null = '_null',
}

export type ModelSizeInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
};

export type Question = {
    __typename: 'Question';
    id: string;
    text: string;
    choices: string;
    icon: string;
    correctAnswer: string;
    openTime: string;
    closeTime: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateQuestionInput = {
    id: string;
    text?: string | null;
    choices?: string | null;
    icon?: string | null;
    correctAnswer?: string | null;
    openTime?: string | null;
    closeTime?: string | null;
};

export type DeleteQuestionInput = {
    id: string;
};

export type CreateAnswerInput = {
    id?: string | null;
    player: string;
    text: string;
    isCorrect?: boolean | null;
    points?: number | null;
    saveTime: string;
    questionId: string;
};

export type ModelAnswerConditionInput = {
    player?: ModelStringInput | null;
    text?: ModelStringInput | null;
    isCorrect?: ModelBooleanInput | null;
    points?: ModelIntInput | null;
    saveTime?: ModelStringInput | null;
    questionId?: ModelStringInput | null;
    and?: Array<ModelAnswerConditionInput | null> | null;
    or?: Array<ModelAnswerConditionInput | null> | null;
    not?: ModelAnswerConditionInput | null;
};

export type ModelBooleanInput = {
    ne?: boolean | null;
    eq?: boolean | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
};

export type ModelIntInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
};

export type Answer = {
    __typename: 'Answer';
    id: string;
    player: string;
    text: string;
    isCorrect?: boolean | null;
    points?: number | null;
    saveTime: string;
    questionId: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateAnswerInput = {
    id: string;
    player?: string | null;
    text?: string | null;
    isCorrect?: boolean | null;
    points?: number | null;
    saveTime?: string | null;
    questionId?: string | null;
};

export type DeleteAnswerInput = {
    id: string;
};

export type CreateChatMessageInput = {
    id?: string | null;
    text: string;
    channel: string;
    createdAt?: string | null;
};

export type ModelChatMessageConditionInput = {
    text?: ModelStringInput | null;
    channel?: ModelStringInput | null;
    createdAt?: ModelStringInput | null;
    and?: Array<ModelChatMessageConditionInput | null> | null;
    or?: Array<ModelChatMessageConditionInput | null> | null;
    not?: ModelChatMessageConditionInput | null;
};

export type ChatMessage = {
    __typename: 'ChatMessage';
    id: string;
    text: string;
    channel: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
};

export type UpdateChatMessageInput = {
    id: string;
    text?: string | null;
    channel?: string | null;
    createdAt?: string | null;
};

export type DeleteChatMessageInput = {
    id: string;
};

export type CreateRulesInput = {
    id?: string | null;
    text: string;
};

export type ModelRulesConditionInput = {
    text?: ModelStringInput | null;
    and?: Array<ModelRulesConditionInput | null> | null;
    or?: Array<ModelRulesConditionInput | null> | null;
    not?: ModelRulesConditionInput | null;
};

export type Rules = {
    __typename: 'Rules';
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateRulesInput = {
    id: string;
    text?: string | null;
};

export type DeleteRulesInput = {
    id: string;
};

export type ModelQuestionFilterInput = {
    id?: ModelIDInput | null;
    text?: ModelStringInput | null;
    choices?: ModelStringInput | null;
    icon?: ModelStringInput | null;
    correctAnswer?: ModelStringInput | null;
    openTime?: ModelStringInput | null;
    closeTime?: ModelStringInput | null;
    and?: Array<ModelQuestionFilterInput | null> | null;
    or?: Array<ModelQuestionFilterInput | null> | null;
    not?: ModelQuestionFilterInput | null;
};

export type ModelIDInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
    size?: ModelSizeInput | null;
};

export type ModelQuestionConnection = {
    __typename: 'ModelQuestionConnection';
    items: Array<Question | null>;
    nextToken?: string | null;
};

export type ModelAnswerFilterInput = {
    id?: ModelIDInput | null;
    player?: ModelStringInput | null;
    text?: ModelStringInput | null;
    isCorrect?: ModelBooleanInput | null;
    points?: ModelIntInput | null;
    saveTime?: ModelStringInput | null;
    questionId?: ModelStringInput | null;
    and?: Array<ModelAnswerFilterInput | null> | null;
    or?: Array<ModelAnswerFilterInput | null> | null;
    not?: ModelAnswerFilterInput | null;
};

export type ModelAnswerConnection = {
    __typename: 'ModelAnswerConnection';
    items: Array<Answer | null>;
    nextToken?: string | null;
};

export type ModelChatMessageFilterInput = {
    id?: ModelIDInput | null;
    text?: ModelStringInput | null;
    channel?: ModelStringInput | null;
    createdAt?: ModelStringInput | null;
    and?: Array<ModelChatMessageFilterInput | null> | null;
    or?: Array<ModelChatMessageFilterInput | null> | null;
    not?: ModelChatMessageFilterInput | null;
};

export type ModelChatMessageConnection = {
    __typename: 'ModelChatMessageConnection';
    items: Array<ChatMessage | null>;
    nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
};

export enum ModelSortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type ModelRulesFilterInput = {
    id?: ModelIDInput | null;
    text?: ModelStringInput | null;
    and?: Array<ModelRulesFilterInput | null> | null;
    or?: Array<ModelRulesFilterInput | null> | null;
    not?: ModelRulesFilterInput | null;
};

export type ModelRulesConnection = {
    __typename: 'ModelRulesConnection';
    items: Array<Rules | null>;
    nextToken?: string | null;
};

export type PlayerQuestion = {
    __typename: 'PlayerQuestion';
    id: string;
    text?: string | null;
    choices?: string | null;
    icon: string;
    correctAnswer?: string | null;
    openTime: string;
    closeTime: string;
};

export type PlayerAnswer = {
    __typename: 'PlayerAnswer';
    id: string;
    player: string;
    text?: string | null;
    isCorrect?: boolean | null;
    points?: number | null;
    saveTime?: string | null;
    questionId?: string | null;
};

export type PlayerAttributes = {
    __typename: 'PlayerAttributes';
    username: string;
    email: string;
};

export type Ranking = {
    __typename: 'Ranking';
    player?: string | null;
    points: number;
    correctAnswers?: number | null;
    allQuestions?: number | null;
};

export type ModelSubscriptionQuestionFilterInput = {
    id?: ModelSubscriptionIDInput | null;
    text?: ModelSubscriptionStringInput | null;
    choices?: ModelSubscriptionStringInput | null;
    icon?: ModelSubscriptionStringInput | null;
    correctAnswer?: ModelSubscriptionStringInput | null;
    openTime?: ModelSubscriptionStringInput | null;
    closeTime?: ModelSubscriptionStringInput | null;
    and?: Array<ModelSubscriptionQuestionFilterInput | null> | null;
    or?: Array<ModelSubscriptionQuestionFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};

export type ModelSubscriptionAnswerFilterInput = {
    id?: ModelSubscriptionIDInput | null;
    player?: ModelSubscriptionStringInput | null;
    text?: ModelSubscriptionStringInput | null;
    isCorrect?: ModelSubscriptionBooleanInput | null;
    points?: ModelSubscriptionIntInput | null;
    saveTime?: ModelSubscriptionStringInput | null;
    questionId?: ModelSubscriptionStringInput | null;
    and?: Array<ModelSubscriptionAnswerFilterInput | null> | null;
    or?: Array<ModelSubscriptionAnswerFilterInput | null> | null;
};

export type ModelSubscriptionBooleanInput = {
    ne?: boolean | null;
    eq?: boolean | null;
};

export type ModelSubscriptionIntInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
    in?: Array<number | null> | null;
    notIn?: Array<number | null> | null;
};

export type ModelSubscriptionChatMessageFilterInput = {
    id?: ModelSubscriptionIDInput | null;
    text?: ModelSubscriptionStringInput | null;
    channel?: ModelSubscriptionStringInput | null;
    createdAt?: ModelSubscriptionStringInput | null;
    and?: Array<ModelSubscriptionChatMessageFilterInput | null> | null;
    or?: Array<ModelSubscriptionChatMessageFilterInput | null> | null;
};

export type ModelSubscriptionRulesFilterInput = {
    id?: ModelSubscriptionIDInput | null;
    text?: ModelSubscriptionStringInput | null;
    and?: Array<ModelSubscriptionRulesFilterInput | null> | null;
    or?: Array<ModelSubscriptionRulesFilterInput | null> | null;
};

export type CreateQuestionMutationVariables = {
    input: CreateQuestionInput;
    condition?: ModelQuestionConditionInput | null;
};

export type CreateQuestionMutation = {
    createQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type UpdateQuestionMutationVariables = {
    input: UpdateQuestionInput;
    condition?: ModelQuestionConditionInput | null;
};

export type UpdateQuestionMutation = {
    updateQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type DeleteQuestionMutationVariables = {
    input: DeleteQuestionInput;
    condition?: ModelQuestionConditionInput | null;
};

export type DeleteQuestionMutation = {
    deleteQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type CreateAnswerMutationVariables = {
    input: CreateAnswerInput;
    condition?: ModelAnswerConditionInput | null;
};

export type CreateAnswerMutation = {
    createAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type UpdateAnswerMutationVariables = {
    input: UpdateAnswerInput;
    condition?: ModelAnswerConditionInput | null;
};

export type UpdateAnswerMutation = {
    updateAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type DeleteAnswerMutationVariables = {
    input: DeleteAnswerInput;
    condition?: ModelAnswerConditionInput | null;
};

export type DeleteAnswerMutation = {
    deleteAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type CreateChatMessageMutationVariables = {
    input: CreateChatMessageInput;
    condition?: ModelChatMessageConditionInput | null;
};

export type CreateChatMessageMutation = {
    createChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type UpdateChatMessageMutationVariables = {
    input: UpdateChatMessageInput;
    condition?: ModelChatMessageConditionInput | null;
};

export type UpdateChatMessageMutation = {
    updateChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type DeleteChatMessageMutationVariables = {
    input: DeleteChatMessageInput;
    condition?: ModelChatMessageConditionInput | null;
};

export type DeleteChatMessageMutation = {
    deleteChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type CreateRulesMutationVariables = {
    input: CreateRulesInput;
    condition?: ModelRulesConditionInput | null;
};

export type CreateRulesMutation = {
    createRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type UpdateRulesMutationVariables = {
    input: UpdateRulesInput;
    condition?: ModelRulesConditionInput | null;
};

export type UpdateRulesMutation = {
    updateRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type DeleteRulesMutationVariables = {
    input: DeleteRulesInput;
    condition?: ModelRulesConditionInput | null;
};

export type DeleteRulesMutation = {
    deleteRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type PlayerSaveAnswerMutationVariables = {
    questionId: string;
    text: string;
};

export type PlayerSaveAnswerMutation = {
    playerSaveAnswer: string;
};

export type GetQuestionQueryVariables = {
    id: string;
};

export type GetQuestionQuery = {
    getQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type ListQuestionsQueryVariables = {
    filter?: ModelQuestionFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListQuestionsQuery = {
    listQuestions?: {
        __typename: 'ModelQuestionConnection';
        items: Array<{
            __typename: 'Question';
            id: string;
            text: string;
            choices: string;
            icon: string;
            correctAnswer: string;
            openTime: string;
            closeTime: string;
            createdAt: string;
            updatedAt: string;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type GetAnswerQueryVariables = {
    id: string;
};

export type GetAnswerQuery = {
    getAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type ListAnswersQueryVariables = {
    filter?: ModelAnswerFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListAnswersQuery = {
    listAnswers?: {
        __typename: 'ModelAnswerConnection';
        items: Array<{
            __typename: 'Answer';
            id: string;
            player: string;
            text: string;
            isCorrect?: boolean | null;
            points?: number | null;
            saveTime: string;
            questionId: string;
            createdAt: string;
            updatedAt: string;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type GetChatMessageQueryVariables = {
    id: string;
};

export type GetChatMessageQuery = {
    getChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type ListChatMessagesQueryVariables = {
    filter?: ModelChatMessageFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListChatMessagesQuery = {
    listChatMessages?: {
        __typename: 'ModelChatMessageConnection';
        items: Array<{
            __typename: 'ChatMessage';
            id: string;
            text: string;
            channel: string;
            createdAt: string;
            updatedAt: string;
            owner?: string | null;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type ChatMessagesByChannelAndCreatedAtQueryVariables = {
    channel: string;
    createdAt?: ModelStringKeyConditionInput | null;
    sortDirection?: ModelSortDirection | null;
    filter?: ModelChatMessageFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ChatMessagesByChannelAndCreatedAtQuery = {
    chatMessagesByChannelAndCreatedAt?: {
        __typename: 'ModelChatMessageConnection';
        items: Array<{
            __typename: 'ChatMessage';
            id: string;
            text: string;
            channel: string;
            createdAt: string;
            updatedAt: string;
            owner?: string | null;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type GetRulesQueryVariables = {
    id: string;
};

export type GetRulesQuery = {
    getRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type ListRulesQueryVariables = {
    filter?: ModelRulesFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListRulesQuery = {
    listRules?: {
        __typename: 'ModelRulesConnection';
        items: Array<{
            __typename: 'Rules';
            id: string;
            text: string;
            createdAt: string;
            updatedAt: string;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type PlayerQuestionListQueryVariables = {};

export type PlayerQuestionListQuery = {
    playerQuestionList: Array<{
        __typename: 'PlayerQuestion';
        id: string;
        text?: string | null;
        choices?: string | null;
        icon: string;
        correctAnswer?: string | null;
        openTime: string;
        closeTime: string;
    }>;
};

export type PlayerQuestionQueryVariables = {
    questionId: string;
};

export type PlayerQuestionQuery = {
    playerQuestion: {
        __typename: 'PlayerQuestion';
        id: string;
        text?: string | null;
        choices?: string | null;
        icon: string;
        correctAnswer?: string | null;
        openTime: string;
        closeTime: string;
    };
};

export type PlayerAnswerListQueryVariables = {
    questionId: string;
};

export type PlayerAnswerListQuery = {
    playerAnswerList: Array<{
        __typename: 'PlayerAnswer';
        id: string;
        player: string;
        text?: string | null;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime?: string | null;
        questionId?: string | null;
    }>;
};

export type PlayerAnswerQueryVariables = {
    questionId: string;
};

export type PlayerAnswerQuery = {
    playerAnswer?: {
        __typename: 'PlayerAnswer';
        id: string;
        player: string;
        text?: string | null;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime?: string | null;
        questionId?: string | null;
    } | null;
};

export type PlayerAttributesListQueryVariables = {};

export type PlayerAttributesListQuery = {
    playerAttributesList: Array<{
        __typename: 'PlayerAttributes';
        username: string;
        email: string;
    }>;
};

export type RankingQueryVariables = {};

export type RankingQuery = {
    ranking: Array<{
        __typename: 'Ranking';
        player?: string | null;
        points: number;
        correctAnswers?: number | null;
        allQuestions?: number | null;
    }>;
};

export type OnCreateQuestionSubscriptionVariables = {
    filter?: ModelSubscriptionQuestionFilterInput | null;
};

export type OnCreateQuestionSubscription = {
    onCreateQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnUpdateQuestionSubscriptionVariables = {
    filter?: ModelSubscriptionQuestionFilterInput | null;
};

export type OnUpdateQuestionSubscription = {
    onUpdateQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnDeleteQuestionSubscriptionVariables = {
    filter?: ModelSubscriptionQuestionFilterInput | null;
};

export type OnDeleteQuestionSubscription = {
    onDeleteQuestion?: {
        __typename: 'Question';
        id: string;
        text: string;
        choices: string;
        icon: string;
        correctAnswer: string;
        openTime: string;
        closeTime: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnCreateAnswerSubscriptionVariables = {
    filter?: ModelSubscriptionAnswerFilterInput | null;
};

export type OnCreateAnswerSubscription = {
    onCreateAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnUpdateAnswerSubscriptionVariables = {
    filter?: ModelSubscriptionAnswerFilterInput | null;
};

export type OnUpdateAnswerSubscription = {
    onUpdateAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnDeleteAnswerSubscriptionVariables = {
    filter?: ModelSubscriptionAnswerFilterInput | null;
};

export type OnDeleteAnswerSubscription = {
    onDeleteAnswer?: {
        __typename: 'Answer';
        id: string;
        player: string;
        text: string;
        isCorrect?: boolean | null;
        points?: number | null;
        saveTime: string;
        questionId: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnCreateChatMessageSubscriptionVariables = {
    filter?: ModelSubscriptionChatMessageFilterInput | null;
};

export type OnCreateChatMessageSubscription = {
    onCreateChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type OnUpdateChatMessageSubscriptionVariables = {
    filter?: ModelSubscriptionChatMessageFilterInput | null;
};

export type OnUpdateChatMessageSubscription = {
    onUpdateChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type OnDeleteChatMessageSubscriptionVariables = {
    filter?: ModelSubscriptionChatMessageFilterInput | null;
};

export type OnDeleteChatMessageSubscription = {
    onDeleteChatMessage?: {
        __typename: 'ChatMessage';
        id: string;
        text: string;
        channel: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
    } | null;
};

export type OnCreateRulesSubscriptionVariables = {
    filter?: ModelSubscriptionRulesFilterInput | null;
};

export type OnCreateRulesSubscription = {
    onCreateRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnUpdateRulesSubscriptionVariables = {
    filter?: ModelSubscriptionRulesFilterInput | null;
};

export type OnUpdateRulesSubscription = {
    onUpdateRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnDeleteRulesSubscriptionVariables = {
    filter?: ModelSubscriptionRulesFilterInput | null;
};

export type OnDeleteRulesSubscription = {
    onDeleteRules?: {
        __typename: 'Rules';
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};
