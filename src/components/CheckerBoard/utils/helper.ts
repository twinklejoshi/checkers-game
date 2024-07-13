import { Cell, Pieces, Players, PlayersPiecesInfo } from "./types";

export const BOARD_SIZE = 8;

export const initialBoard: Cell[][] = Array.from(
  { length: BOARD_SIZE },
  (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => {
      if (row < 3 && (row + col) % 2 === 1)
        return { piece: Pieces.Computer, player: Players.Computer, isKing: false };
      if (row >= BOARD_SIZE - 3 && (row + col) % 2 === 1)
        return { piece: Pieces.Player, player: Players.Person, isKing: false };
      return { piece: null, player: null, isKing: false };
    })
);

export const calculatePlayersMoves = (
  currentPlayer: Players,
  moves: PlayersPiecesInfo
) => {
  return currentPlayer === Players.Person
    ? { player: moves.player + 1, computer: moves.computer }
    : { player: moves.player, computer: moves.computer + 1 };
};

export const calculatePlayersPiecesLeft = (
  currentPlayer: Players,
  piecesLeft: PlayersPiecesInfo
) => {
  return currentPlayer === Players.Person
    ? { player: piecesLeft.player, computer: piecesLeft.computer - 1 }
    : { player: piecesLeft.player - 1, computer: piecesLeft.computer };
};

export const isWithinBounds = (row: number, col: number) =>
  row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
