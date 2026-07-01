import { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(50 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (onTimeUp) {
            onTimeUp();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <h2
      style={{
        color: "#facc15",
        marginBottom: "20px",
      }}
    >
      ⏱ Time Left : {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </h2>
  );
}

export default Timer;