import React, { useContext, useEffect } from "react";
import { TimerContext } from "../../../contexts";

export const GameTimer: React.FC = () => {
  const { time, setTime, seconds, setSeconds } = useContext(TimerContext);

  useEffect(() => {
    const increaseTime = () => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    };

    const timerId = setInterval(increaseTime, 1000);

    return () => clearInterval(timerId);
  }, [setSeconds]);

  useEffect(() => {
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      const formattedMinutes = m < 10 ? `0${m}` : m.toString();
      const formattedSeconds = s < 10 ? `0${s}` : s.toString();
      return `${formattedMinutes}:${formattedSeconds}`;
    };

    setTime(formatTime(seconds));
  }, [seconds, setTime]);

  return (
    <div>
      <h3 id="time" className="time">
        Time:{time}
      </h3>
    </div>
  );
};
