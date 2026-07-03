import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const startTest = (subject) => {
    navigate("/mock-test", {
      state: {
        subject: subject,
        questionCount: 50,
        time: 40,
      },
    });
  };

  return (
    <div style={container}>
      <h1 style={{ color: "white" }}>🧠 Mock Test App</h1>

      <div style={box}>
        <button style={btn} onClick={() => startTest("Mixed")}>
          Mixed Test
        </button>

        <button style={btn} onClick={() => startTest("English")}>
          English
        </button>

        <button style={btn} onClick={() => startTest("Math")}>
          Math
        </button>

        <button style={btn} onClick={() => startTest("Reasoning")}>
          Reasoning
        </button>

        <button style={btn} onClick={() => startTest("GK")}>
          GK
        </button>

        <button style={btn} onClick={() => startTest("Computer")}>
          Computer
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  height: "100vh",
  background: "#0f172a",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const box = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const btn = {
  padding: "15px 25px",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "white",
};

export default Home;