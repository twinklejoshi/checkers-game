import React, { createContext, useState } from "react";

interface TimerContextProps {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>(
  {} as TimerContextProps
);

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState("00:00");
  const [seconds, setSeconds] = useState(0);

  return (
    <TimerContext.Provider value={{ time, setTime, seconds, setSeconds }}>
      {children}
    </TimerContext.Provider>
  );
};
