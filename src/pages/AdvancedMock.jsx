import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdvancedMock() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Mixed");
  const [questionCount, setQuestionCount] = useState(50);
  const [time, setTime] = useState(40);

  const startTest = () => {
    const q = Number(questionCount);
    const t = Number(time);

    if (q < 10 || q > 200) {
      alert("Questions must be between 10 and 200.");
      return;
    }

    if (t < 1 || t > 300) {
      alert("Timer must be between 1 and 300 minutes.");
      return;
    }

    navigate("/mock-test", {
      state: {
        subject,
        questionCount: q,
        time: t,
      },
    });
  };

  return (
    <>
      <Header />

      <div style={container}>
        <div style={card}>

          <h1 style={title}>🚀 Advanced Mock Test</h1>

          <label style={label}>Select Subject</label>

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

          <label style={label}>Questions (10 - 200)</label>

          <input
            type="number"
            min="10"
            max="200"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            style={input}
          />

          <label style={label}>Timer (Minutes)</label>

          <input
            type="number"
            min="1"
            max="300"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={input}
          />

          <button style={button} onClick={startTest}>
            ▶ Start Advanced Mock
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const card = {
  width: "450px",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 0 20px rgba(0,0,0,.35)",
};

const title = {
  color: "white",
  textAlign: "center",
  marginBottom: "25px",
};

const label = {
  color: "white",
  display: "block",
  marginBottom: "8px",
  marginTop: "15px",
  fontWeight: "bold",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  marginTop: "25px",
  padding: "15px",
  background: "#16a34a",
  color: "white",
  fontSize: "18px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AdvancedMock;