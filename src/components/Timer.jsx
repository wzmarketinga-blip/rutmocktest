import { useEffect, useState } from "react";

function Timer({ minutes = 40, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    setTimeLeft(minutes * 60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <h2 style={{ color: "#facc15" }}>
      ⏱ {m}:{s < 10 ? "0" : ""}{s}
    </h2>
  );
}

export default Timer;