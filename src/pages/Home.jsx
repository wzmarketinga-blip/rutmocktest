import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPassword } from "../services/googleSheet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Mixed");
  const [password, setPassword] = useState("");

  const startMock = async () => {
    try {
      const data = await getPassword();

      if (password !== String(data.password)) {
        alert("❌ Wrong Access Password");
        return;
      }

      navigate("/mock-test", {
        state: {
          subject,
          questionCount: 50,
          time: 40,
        },
      });
    } catch (e) {
      alert("Server Error");
    }
  };

 return (
  <>
    <Header />

    <div style={container}>
      <div style={card}>
        <h1 style={title}>🧠 Mock Test Portal</h1>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={input}
        >
          <option>Mixed</option>
          <option>Computer</option>
          <option>English</option>
          <option>Math</option>
          <option>Reasoning</option>
          <option>GK</option>
        </select>

        <input
          type="password"
          placeholder="Access Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={startBtn} onClick={startMock}>
          ▶ Start Mock Test
        </button>

        <button
          style={advBtn}
          onClick={() => navigate("/advanced-mock")}
        >
          🚀 Advanced Mock Test
        </button>

        <button
          style={blueBtn}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>

        <button
          style={blueBtn}
          onClick={() => navigate("/govt-exams")}
        >
          📚 Govt Exams
        </button>
      </div>
    </div>

    <Footer />
  </>
);
}

const container = {
  minHeight: "calc(100vh - 150px)",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  boxSizing: "border-box",
};

const card = {
  width: "420px",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0,0,0,.4)",
};

const title = {
  color: "white",
  marginBottom: "25px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

const startBtn = {
  width: "100%",
  padding: "15px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "12px",
};

const advBtn = {
  width: "100%",
  padding: "15px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "12px",
};

const blueBtn = {
  width: "100%",
  padding: "15px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "12px",
};

const footer = {
  color: "#cbd5e1",
  marginTop: "20px",
  fontSize: "14px",
};

export default Home;