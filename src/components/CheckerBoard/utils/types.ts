export type PlayersPiecesInfo = { player: number; computer: number };
export type PersonValidMoves = {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
};

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
  isReset: boolean;
}

export interface Cell {
  piece: Pieces | null;
  player: Players | null;
  isKing: boolean;
}

export enum Labels {
  Dark = "dark",
  Light = "light",
}
