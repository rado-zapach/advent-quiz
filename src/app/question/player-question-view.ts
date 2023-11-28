import {PlayerQuestion} from '../API.service';
import {PlayerQuestionState} from './player-question-state.enum';

export interface PlayerQuestionView extends PlayerQuestion {
    day: number;
    state: PlayerQuestionState;
}
