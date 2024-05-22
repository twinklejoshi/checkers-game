import React from "react";
import "./App.scss";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { TimerProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <div className="App">
      <TimerProvider>
        <WelcomePage />
      </TimerProvider>
    </div>
  );
};

export default App;
