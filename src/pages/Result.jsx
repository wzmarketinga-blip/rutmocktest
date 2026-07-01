import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h1>🏆 Result</h1>

        <h2>Score</h2>

        <h1>
          {score} / {total}
        </h1>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default Result;