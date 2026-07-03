import { useEffect, useState } from "react";

function Timer({ minutes = 40, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(Number(minutes) * 60);

  // Agar minutes change ho to timer reset ho
  useEffect(() => {
    setTimeLeft(Number(minutes) * 60);
  }, [minutes]);

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
  }, [onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <h2
      style={{
        color: "#facc15",
        marginBottom: "20px",
        fontSize: "30px",
        fontWeight: "bold",
      }}
    >
      ⏱ Time Left : {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </h2>
  );
}

export default Timer;