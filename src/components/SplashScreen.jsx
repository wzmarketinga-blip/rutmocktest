import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        zIndex: 9999,
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        🎓 RUT MOCK TEST
      </h1>

      <h3
        style={{
          fontWeight: "normal",
          marginBottom: "35px",
          color: "#cbd5e1",
        }}
      >
        Practice • Improve • Succeed
      </h3>

      <div
        style={{
          width: "320px",
          height: "12px",
          background: "#334155",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#22c55e",
            transition: "0.1s",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "15px",
          fontSize: "18px",
        }}
      >
        Preparing Your Exam... {progress}%
      </p>
    </div>
  );
}

export default SplashScreen;