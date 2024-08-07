/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import "./CheckerBoard.scss";
import pieceImgLight from "../../images/light.png";
import pieceImgDark from "../../images/brown.png";
import { CheckerBoardProps, Labels, Pieces, Players } from "./utils/types";
import {
  BOARD_SIZE,
  calculatePlayersMoves,
  calculatePlayersPiecesLeft,
  isWithinBounds,
} from "./utils/helper";
import { CheckBoardContext } from "../../contexts";

export const CheckerBoard: React.FC<CheckerBoardProps> = ({
  gameOver, isReset
}: CheckerBoardProps) => {
  const {
    board,
    setBoard,
    piecesLeft,
    setPiecesLeft,
    moves,
    setMoves,
    currentPlayer,
    setCurrentPlayer,
  } = useContext(CheckBoardContext);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );
  const [personValidMoves, setPersonValidMoves] = useState<
    {
      startRow: number;
      startCol: number;
      endRow: number;
      endCol: number;
    }[]
  >([]);

  //if player is person, get valid moves for the selected cell
  const handleCellInteraction = (row: number, col: number) => {
    if (currentPlayer !== Players.Person) return;
    const cell = board[row][col];
    if (cell.player === Players.Person) {
      const selectedMoves = personValidMoves
        .filter(
          ({ startRow, startCol }) => startRow === row && startCol === col
        )
        .map((move) => ({ row: move.endRow, col: move.endCol }));
      setValidMoves(selectedMoves);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  //if player is person and moves are valid, make move to the valid cell
  const handleMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    if (currentPlayer !== Players.Person) return;
    if (validMoves.some((move) => move.row === endRow && move.col === endCol)) {
      makeMove(startRow, startCol, endRow, endCol);
      setValidMoves([]);
      setPersonValidMoves([]);
      setCurrentPlayer(Players.Computer);
    }
  };

  const handleDrop = (e: React.DragEvent, dropRow: number, dropCol: number) => {
    e.preventDefault();
    const startRow = parseInt(e.dataTransfer.getData("row"));
    const startCol = parseInt(e.dataTransfer.getData("col"));
    handleMove(startRow, startCol, dropRow, dropCol);
  };

  const handleDragStart = (e: React.DragEvent, row: number, col: number) => {
    handleCellInteraction(row, col);
    const cell = board[row][col];
    if (cell.player === Players.Person) {
      e.dataTransfer.setData("row", row.toString());
      e.dataTransfer.setData("col", col.toString());
    }
  };

  const isValidMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ): boolean => {
    // Determine the direction of movement based on the current player.
    // Players.Person moves upward (-1), Players.Computer moves downward (+1).
    //const direction = currentPlayer === Players.Person ? -1 : 1;

    // Calculate the difference in rows and columns between the start and end positions.
    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    // Check if the destination cell is occupied. If it is, the move is invalid.
    if (board[endRow][endCol].piece) {
      return false;
    }

    // Check for a regular move (one step diagonally).
    // A regular move is valid if it's a one-step diagonal move in the correct direction.
    const isRegularMove = Math.abs(colDiff) === 1 && Math.abs(rowDiff) === 1;
    // Check for a capture move (two steps diagonally).
    // A capture move is valid if it's a two-step diagonal move.
    const isCaptureMove = Math.abs(colDiff) === 2 && Math.abs(rowDiff) === 2;

    if (isRegularMove) {
      return true;
    }

    if (isCaptureMove) {
      // Calculate the position of the piece being jumped over.
      const midRow = (startRow + endRow) / 2;
      const midCol = (startCol + endCol) / 2;
      // Get the piece in the middle position.
      const midPiece = board[midRow][midCol].piece;
      // A capture move is valid if there is a piece in the middle and it belongs to the opponent.
      if (midPiece && board[midRow][midCol].player !== currentPlayer) {
        return true;
      }
    }
    // If none of the valid move conditions are met, return false.
    return false;
  };

  const getValidMoves = (
    row: number,
    col: number,
    isKing: boolean
  ): { row: number; col: number }[] => {
    const moves: { row: number; col: number }[] = [];

    const directions = isKing
        ? [
            [-1, -1], // Up-left
            [-1, 1],  // Up-right
            [1, -1],  // Down-left
            [1, 1],   // Down-right
          ]
        : currentPlayer === Players.Person
            ? [
                [-1, -1], // Up-left
                [-1, 1],  // Up-right
              ]
            : [
                [1, -1],  // Down-left
                [1, 1],   // Down-right
              ];

    // Define movement directions based on the current player.
    // Players.Person moves upward, Players.Computer moves downward.
    // const directions =
    //   currentPlayer === Players.Person
    //     ? [
    //         [-1, -1], // Up-left
    //         [-1, 1], // Up-right
    //       ]
    //     : [
    //         [1, -1], // Down-left
    //         [1, 1], // Down-right
    //       ];

    // Iterate over each direction to calculate possible moves.
    for (const [dRow, dCol] of directions) {
      // Calculate the new position for a regular move (one step diagonally).
      const newRow = row + dRow;
      const newCol = col + dCol;

      // Check if the new position is within bounds and is a valid move.
      if (
        isWithinBounds(newRow, newCol) &&
        isValidMove(row, col, newRow, newCol)
      ) {
        // Add the valid move to the list.
        moves.push({ row: newRow, col: newCol });
      }

      // Calculate the new position for a capture move (two steps diagonally).
      const captureRow = row + 2 * dRow;
      const captureCol = col + 2 * dCol;

      // Check if the new position for capture is within bounds and is a valid move.
      if (
        isWithinBounds(captureRow, captureCol) &&
        isValidMove(row, col, captureRow, captureCol)
      ) {
        // Add the valid capture move to the list.
        moves.push({ row: captureRow, col: captureCol });
      }
    }

    // Filter the moves to prioritize capture moves.
    // const captureMoves = moves.filter((move) => Math.abs(move.row - row) === 2);

    // // Return capture moves if any exist, otherwise return all valid moves.
    // return captureMoves.length > 0 ? captureMoves : moves;
    return moves;
  };

  const getAllValidMoves = (player: Players) => {
    // Initialize an array to store all valid moves for the player.
    const validMoves: {
      startRow: number;
      startCol: number;
      endRow: number;
      endCol: number;
    }[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell =board[row][col];
        if (cell.player === player) {
          // Get all valid moves for the piece at the current position.
          const moves = getValidMoves(row, col, cell.isKing);

          // Add each valid move to the validMoves array.
          for (const move of moves) {
            validMoves.push({
              startRow: row,
              startCol: col,
              endRow: move.row,
              endCol: move.col,
            });
          }
        }
      }
    }

    // If there are no valid moves, return null indicating no move can be made.
    if (validMoves.length === 0) {
      return null; //end game
    }
    //return validMoves;
     // Filter the moves to prioritize capture moves.
     const captureMoves = validMoves.filter((move) => Math.abs(move.startRow - move.endRow) === 2);

     // Return capture moves if any exist, otherwise return all valid moves.
     return captureMoves.length > 0 ? captureMoves : validMoves;
  };

  const makeMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    // Update the board state using the previous state as reference
    setBoard((prevBoard) => {
      // Create a new copy of the board
      const newBoard = [...prevBoard];
      const piece = newBoard[startRow][startCol];

      // Create new copies of the rows involved in the move
      newBoard[endRow] = [...newBoard[endRow]];
      newBoard[startRow] = [...newBoard[startRow]];

      // Move the piece to the new position
      newBoard[endRow][endCol] = { ...newBoard[startRow][startCol] };
      // Empty the starting position
      newBoard[startRow][startCol] = { piece: null, player: null, isKing: false };

      // Check if the move is a capture move (two steps)
      if (Math.abs(endRow - startRow) === 2) {
        // Calculate the position of the captured piece
        const capturedRow = (startRow + endRow) / 2;
        const capturedCol = (startCol + endCol) / 2;

        // Create a new copy of the row containing the captured piece
        newBoard[capturedRow] = [...newBoard[capturedRow]];
        // Remove the captured piece
        newBoard[capturedRow][capturedCol] = { piece: null, player: null, isKing: false };

        // Call the callback function to update the number of pieces left for the player
        setPiecesLeft(calculatePlayersPiecesLeft(currentPlayer, piecesLeft));
      }
      if ((piece.player === Players.Person && endRow === 0) || (piece.player === Players.Computer && endRow === BOARD_SIZE - 1)) {
        newBoard[endRow][endCol].isKing = true;
    }

      // Return the updated board state
      return newBoard;
    });

    // Call the callback function to update the move count for the player
    setMoves(calculatePlayersMoves(currentPlayer, moves));
  };

  useEffect(() => {
      const playerValidMoves = getAllValidMoves(currentPlayer);
      if (!playerValidMoves) {
        gameOver(true);
      } else {
        if (currentPlayer === Players.Computer) {
          const computerMove = getComputerMove(playerValidMoves);
          if (computerMove) {
            const timeoutId = setTimeout(() => {
              makeMove(
                computerMove.startRow,
                computerMove.startCol,
                computerMove.endRow,
                computerMove.endCol
              );
              setCurrentPlayer(Players.Person);
            }, 1000);
            return () => clearTimeout(timeoutId);
          }
        } else {
          setPersonValidMoves(playerValidMoves);
        }
      }
  }, [currentPlayer, isReset]);

  const getComputerMove = (
    validMoves: {
      startRow: number;
      startCol: number;
      endRow: number;
      endCol: number;
    }[]
  ) => {
    // Randomly select one of the valid moves.
    const selectedMove =
      validMoves[Math.floor(Math.random() * validMoves.length)];
    // Return the selected move.
    return selectedMove;
  };

  return (
    
    <div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  (rowIndex + colIndex) % 2 === 0 ? Labels.Light : Labels.Dark
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                onMouseOver={() => handleCellInteraction(rowIndex, colIndex)}
                onMouseOut={() => setValidMoves([])}
              >
                {cell.piece && (
                  <div
                    className={`piece ${cell.piece}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                  >
                    <img
                      className="icon"
                      src={
                        cell.piece === Pieces.Player
                          ? pieceImgLight
                          : pieceImgDark
                      }
                      alt={`${cell.piece}`}
                    />
                  </div>
                )}
               
                {validMoves.some(
                  (move) => move.row === rowIndex && move.col === colIndex
                ) && <div className="highlight"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckerBoard;
