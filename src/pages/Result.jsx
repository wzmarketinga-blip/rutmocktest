import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, percent, grade } = location.state || {};

  return (
    <div style={container}>
      <h1>📊 Result</h1>

      <h2>Score: {score} / {total}</h2>
      <h2>Percentage: {percent}%</h2>
      <h2>Grade: {grade}</h2>

      <button style={btn} onClick={() => navigate("/")}>
        🏠 Back to Home
      </button>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "#0f172a",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const btn = {
  marginTop: "20px",
  padding: "12px 25px",
  fontSize: "18px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
};

export default Result;