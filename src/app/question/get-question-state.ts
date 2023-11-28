import {PlayerQuestion} from '../API.service';
import {PlayerQuestionState} from './player-question-state.enum';

export function GetQuestionState(q: PlayerQuestion) {
    const now = new Date().getTime();
    const openTime = new Date(q.openTime).getTime();
    const closeTime = new Date(q.closeTime).getTime();
    return now >= closeTime
        ? PlayerQuestionState.CLOSED
        : now >= openTime
          ? PlayerQuestionState.OPEN
          : PlayerQuestionState.BEFORE;
}
