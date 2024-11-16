// components/commons/CountdownTimer.js
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ onTimeEnd, restart }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [isVisible, setIsVisible] = useState(true);

  // restart prop이 변경될 때마다 타이머 재시작
  useEffect(() => {
    setTimeLeft(180);
    setIsVisible(true);
  }, [restart]);

  useEffect(() => {
    if (timeLeft > 0 && isVisible) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && isVisible) {
      setIsVisible(false);
      onTimeEnd?.();
    }
  }, [timeLeft, isVisible, onTimeEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${!isVisible ? "hidden" : ""} text-center mb-2`}>
      <span className="text-lg text-undtextdark">
        &nbsp;
        <span className="text-lg font-bold text-undtextdark">
          {formatTime(timeLeft)}
        </span>
      </span>
    </div>
  );
};

export default CountdownTimer;
