import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 100 × 50ms = ~5 sec

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <>
      <style>{`
        @keyframes zoom {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse {
          0% { opacity: .5; }
          50% { opacity: 1; }
          100% { opacity: .5; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(-45deg,#0f172a,#1e3a8a,#1d4ed8,#0f172a)",
          backgroundSize: "400% 400%",
          animation: "gradient 8s ease infinite",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            animation: "zoom 2s ease",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              marginBottom: "10px",
            }}
          >
            🎓 RUT MOCK TEST
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#cbd5e1",
              animation: "pulse 2s infinite",
            }}
          >
            Practice • Improve • Succeed
          </p>
        </div>

        <div
          style={{
            width: "340px",
            height: "12px",
            background: "#334155",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#22c55e",
              transition: "width .05s linear",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "18px",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          Preparing Your Exam... {progress}%
        </p>
      </div>
    </>
  );
}

export default SplashScreen;