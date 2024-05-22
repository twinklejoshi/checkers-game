import { useContext, useState } from "react";
import "./Game.scss";
import { Button, PlayerCard, ConfirmationDialog, GameTimer } from "../shared";
import {
  Cell,
  CheckerBoard,
  PlayersPiecesInfo,
  initialBoard,
} from "../CheckerBoard";
import { TimerContext } from "../../contexts";

interface GameProps {
  name: string;
  onQuitGame: () => void;
}

export const Game: React.FC<GameProps> = ({ name, onQuitGame }: GameProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [board, setBoard] = useState<Cell[][]>(initialBoard); 
  const [piecesLeft, setPiecesLeft] = useState<PlayersPiecesInfo>({
    player: 12,
    computer: 12,
  });
  const [moves, setMoves] = useState<PlayersPiecesInfo>({
    player: 0,
    computer: 0,
  });
  const { setTime, setSeconds } = useContext(TimerContext);

  const handleConfirmationDialog = () => {
    setIsDialogVisible(true);
  };

  const handleConfirmationDialogConfirm = () => {
    setIsDialogVisible(false);
    resetGame();
    onQuitGame();
  };

  const handleConfirmationDialogCancel = () => {
    setIsDialogVisible(false);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setMoves({
      player: 0,
      computer: 0,
    });
    setPiecesLeft({
      player: 12,
      computer: 12,
    });
    setTime("00:00");
    setSeconds(0);
  };

  return (
    <>
      <GameTimer />
      <div className="game">
        <PlayerCard
          name={name}
          piecesLeft={piecesLeft.player}
          moves={moves.player}
        />
        <div className="checkerBoard">
          <div>
            <CheckerBoard
              board={board}
              setBoard={setBoard}
              piecesLeft={piecesLeft}
              moves={moves}
              onMovePieces={setMoves}
              onCapturePieces={setPiecesLeft}
            />
          </div>
          <div className="buttons-group">
            <Button label={"Reset game"} onButtonClick={resetGame} />
            <Button label={"Quit Game"} onButtonClick={handleConfirmationDialog} />
          </div>
          {isDialogVisible && (
            <ConfirmationDialog
              message="Are you sure you want to quit the game?"
              onConfirm={handleConfirmationDialogConfirm}
              onCancel={handleConfirmationDialogCancel}
            />
          )}
        </div>
        <PlayerCard
          name=""
          piecesLeft={piecesLeft.computer}
          moves={moves.computer}
        />
      </div>
    </>
  );
};

export default Game;
