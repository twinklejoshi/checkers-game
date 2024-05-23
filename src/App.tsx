import React from "react";
import "./App.scss";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { CheckBoardProvider, TimerProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <div className="App">
      <TimerProvider>
        <CheckBoardProvider>
          {" "}
          <WelcomePage />
        </CheckBoardProvider>
      </TimerProvider>
    </div>
  );
};

export default App;
