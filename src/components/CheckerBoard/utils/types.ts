export type PlayersPiecesInfo = { player: number; computer: number };

export enum Players {
  Person = "person",
  Computer = "computer",
}

export enum Pieces {
  Player = "light",
  Computer = "brown",
}

export interface CheckerBoardProps {
  gameOver: (isOver: boolean) => void;
}

export interface Cell {
  piece: Pieces | null;
  player: Players | null;
}

export enum Labels {
  Dark = "dark",
  Light = "light",
}
