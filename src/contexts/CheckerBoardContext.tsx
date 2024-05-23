import React, { createContext, useState } from "react";
import { Cell, Players, PlayersPiecesInfo, initialBoard } from "../components/CheckerBoard";

interface CheckerBoardProps {
    board: Cell[][];
    setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
    currentPlayer: Players;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Players>>;
    moves: PlayersPiecesInfo;
    setMoves: React.Dispatch<React.SetStateAction<PlayersPiecesInfo>>;
    piecesLeft: PlayersPiecesInfo;
    setPiecesLeft:  React.Dispatch<React.SetStateAction<PlayersPiecesInfo>>;
  }
export const CheckBoardContext = createContext<CheckerBoardProps>(
  {} as CheckerBoardProps
);

export const CheckBoardProvider = ({ children }) => {    
    const [board, setBoard] = useState<Cell[][]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.Person);
    const [piecesLeft, setPiecesLeft] = useState<PlayersPiecesInfo>({
      player: 12,
      computer: 12,
    });
    const [moves, setMoves] = useState<PlayersPiecesInfo>({
      player: 0,
      computer: 0,
    });

  return (
    <CheckBoardContext.Provider value={{ board, setBoard, 
        currentPlayer,
        setCurrentPlayer,
        piecesLeft,
        setPiecesLeft,
        moves,
        setMoves}}>
            {console.log(piecesLeft)}
      {children}
    </CheckBoardContext.Provider>
  );
};
