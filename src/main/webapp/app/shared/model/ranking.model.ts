export interface Ranking {
  login: string;
  firstName: string;
  lastName: string;
  points: number;
  scoredAnswers: number;
  correctAnswers: number;
  allAnswers: number;
  averageScoredAnswerTimeMs: number;
}
