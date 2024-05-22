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
  board: Cell[][];
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
  piecesLeft: PlayersPiecesInfo;
  moves: PlayersPiecesInfo;
  onMovePieces: (platersMoves: PlayersPiecesInfo) => void;
  onCapturePieces: (playersPiecesLeft: PlayersPiecesInfo) => void;
}

export interface Cell {
  piece: Pieces | null;
  player: Players | null;
}

export enum Labels {
  Dark = "dark",
  Light = "light",
}
