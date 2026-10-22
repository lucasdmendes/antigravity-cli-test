export type TerminalTheme = 'green' | 'amber' | 'slate';

export type GameStatus = 'PLAYING' | 'GAME_OVER' | 'VICTORY';

export interface StoryChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  consequence?: string;
}

export interface StoryPart {
  id: number;
  chapterNumber: number;
  title: string;
  location: string;
  text: string;
  choices: [StoryChoice, StoryChoice, StoryChoice];
}

export interface StoryEngineState {
  currentPartIndex: number;
  status: GameStatus;
  attempts: number;
  highestPartReached: number;
  selectedChoice: StoryChoice | null;
  history: number[];
}
