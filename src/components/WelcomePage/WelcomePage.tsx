import React, { useContext, useState } from "react";
import "./WelcomePage.scss";
import Game from "../Game/Game";
import { TimerContext } from "../../contexts";
import { Button, InputForm } from "../shared";

const WelcomePage: React.FC = () => {
  const [screenUp, setScreenUp] = useState(2);
  //state for the name field is passed from welcome page to input form and can be updated in both the components
  const [name, setName] = useState("");
  //to allow updating state of timer in multiple components
  const { setTime, setSeconds } = useContext(TimerContext);

  /*
  Explanation:
  State Management: The visibleScreen state variable is used to track which screen is currently visible:

  0 for the welcome screen
  1 for the player info screen
  2 for the game screen
  Generic Event Handler: The handleClick function takes a screen parameter to determine which screen should be visible next.
  */

  //Function to add screen number'
  const handleClick = (screen: number) => {
    setScreenUp(screen);
  };

  //Function to add class name 'up' to the element based on the screen numbers, this will trigger transition to next screen'
  // className 'up' will be added to welcome screen and player info screen only
  const addClassName = (screen: number) =>
    (screen === 0 && (screenUp === 0 || screenUp === 1)) ||
    (screen === 1 && screenUp === 1)
      ? "up"
      : "";

  // submits the input form and triggers animation to show next screen and set the timer for game
  const handleSubmit = () => {
    handleClick(1);
    setTime("00:00");
    setSeconds(0);
  };

  const handleQuit = () => {
    handleClick(2);
    setName("");
  };

  return (
    <>
      <div className={`screen ${addClassName(0)}`}>
        <h1>Checkers Game</h1>
        <Button label="Get started" onButtonClick={() => handleClick(0)} />
      </div>
      <div className={`screen ${addClassName(1)}`}>
        <InputForm
          id="name"
          label="Enter player's name"
          inputValue={name}
          onChange={setName}
          onSubmitPlayer={handleSubmit}
        />
      </div>
      <div className={`screen`}>
        <Game name={name} onQuitGame={handleQuit} />{" "}
      </div>
    </>
  );
};

export default WelcomePage;
