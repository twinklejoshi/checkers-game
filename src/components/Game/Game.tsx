import { useContext, useEffect, useState } from "react";
import "./Game.scss";
import { Button, PlayerCard, ConfirmationDialog, GameTimer } from "../shared";
import { CheckerBoard, Players, initialBoard } from "../CheckerBoard";
import { CheckBoardContext, TimerContext } from "../../contexts";

interface GameProps {
  name: string;
  onQuitGame: () => void;
}

export const Game: React.FC<GameProps> = ({ name, onQuitGame }: GameProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const {
    setBoard,
    piecesLeft,
    setPiecesLeft,
    moves,
    setMoves,
    setCurrentPlayer,
  } = useContext(CheckBoardContext);
  const { setTime, setSeconds } = useContext(TimerContext);

  const showDialog = () => {
    setIsDialogVisible(true);
  };

  const confirmQuitGame = () => {
    setIsDialogVisible(false);
    resetGame();
    onQuitGame();
  };

  const hideDialog = () => {
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
    setCurrentPlayer(Players.Person);
    setIsGameOver(false);
    setIsReset(true);
  };

  const startAgain = () => {
    resetGame();
    hideDialog();
  };

  const handleGameOver = (isOver: boolean) => {
    setIsGameOver(isOver);
    showDialog();
  };

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

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
            <CheckerBoard gameOver={handleGameOver} isReset={isReset}/>
            {isDialogVisible && isGameOver && (
              <ConfirmationDialog
                message={
                  piecesLeft.player > piecesLeft.computer
                    ? `You win \u{1F3C6}`
                    : `You lose \u{1F61E}`
                }
                label1="Restart game"
                label2="Quit game"
                onButtonClick1={startAgain}
                onButtonClick2={confirmQuitGame}
              />
            )}
          </div>
          <div className="buttons-group">
            <Button label={"Reset game"} onButtonClick={resetGame} />
            <Button label={"Quit game"} onButtonClick={showDialog} />
          </div>
          {isDialogVisible && !isGameOver && (
            <ConfirmationDialog
              message="Are you sure you want to quit the game?"
              label1="Confirm"
              label2="Cancel"
              onButtonClick1={confirmQuitGame}
              onButtonClick2={hideDialog}
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
