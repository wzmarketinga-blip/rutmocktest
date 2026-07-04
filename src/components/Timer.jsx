import { useEffect, useRef, useState } from "react";

function Timer({ minutes = 40, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    // Reset when new test starts
    submittedRef.current = false;
    setTimeLeft(minutes * 60);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          if (!submittedRef.current) {
            submittedRef.current = true;

            alert("⏰ Time Over!\nTest Auto Submitted.");

            if (onTimeUp) {
              onTimeUp();
            }
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [minutes]);

  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  let color = "#22c55e";

  if (timeLeft <= 600) color = "#f59e0b";
  if (timeLeft <= 300) color = "#ef4444";

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "20px",
        boxShadow: "0 0 12px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          color,
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        ⏱ {String(hrs).padStart(2, "0")}:
        {String(mins).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}
      </div>

      <div
        style={{
          color: "#cbd5e1",
          marginTop: "8px",
          fontSize: "14px",
        }}
      >
        Remaining Time
      </div>
    </div>
  );
}

export default Timer;