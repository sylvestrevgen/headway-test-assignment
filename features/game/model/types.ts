import { GameStatus } from "./constants";

export interface Question {
  id: number;
  text: string;
  options: string[];
  answers: number[];
  prize: number;
}

export interface GameState {
  activeQuestionId: number | null;
  status: GameStatus;
  selectedOptionIndexes: number[];
  revealAnswers: boolean;
}
