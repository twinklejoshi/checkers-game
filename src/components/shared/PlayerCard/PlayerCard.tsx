import { ReactElement } from "react";
import playerImg from "../../../images/light.svg";
import computerImg from "../../../images/brown.svg";
import "./PlayerCard.scss";

interface PlayerProps {
  name: string | null;
  moves: number;
  piecesLeft: number;
}

export const PlayerCard: React.FC<PlayerProps> = ({
  name,
  moves,
  piecesLeft,
}): ReactElement => {
  return (
    <>
      <div className="card">
        <div className="banner">
          <img src={name ? playerImg : computerImg} alt=""></img>
        </div>

        <div className="name">
          <h2>{name ? name : "Computer"}</h2>
        </div>

        <div className="actions">
          <div className="info">
            <h2>
              <span>{moves}</span>
              <small>Moves</small>
            </h2>
            <h2>
              <span>{piecesLeft}</span>
              <small>Pieces Left</small>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
