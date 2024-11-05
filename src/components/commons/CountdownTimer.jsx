import React, { useState, useEffect } from "react";

const CountdownTimer = ({ onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [closeTimer, setCloseTimer] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000); // 1초마다 감소

      return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
    } else if (onTimeEnd) {
      onTimeEnd();
      timerExposureHandler();
    }
  }, [timeLeft, onTimeEnd]); // timeLeft 변경될 때마다 effect 실행

  const timerExposureHandler = () => {
    setCloseTimer(true);
  };

  // 시간을 분:초 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className={`${closeTimer ? "hidden" : ""}`}>
      <p className="text-2xl font-bold m-4">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default CountdownTimer;
