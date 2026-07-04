import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPassword } from "../services/googleSheet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdvancedMock() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [password, setPassword] = useState("");
  const [questionCount, setQuestionCount] = useState(50);
  const [time, setTime] = useState(40);

  const startTest = async () => {
    const q = Number(questionCount);
    const t = Number(time);

    if (subjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }

    if (q < 10 || q > 300) {
      alert("Questions must be between 10 and 300.");
      return;
    }

    if (t < 1 || t > 500) {
      alert("Timer must be between 1 and 500 minutes.");
      return;
    }

    try {
      const data = await getPassword();

      if (password !== String(data.password)) {
        alert("❌ Wrong Access Password");
        return;
      }

      navigate("/mock-test", {
        state: {
          subjects,
          questionCount: q,
          time: t,
        },
      });
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <>
      <Header />

      <div style={container}>
        <div style={card}>
          <h1 style={title}>🚀 Advanced Mock Test</h1>

          <label style={label}>Select Subjects</label>

          {["Computer", "English", "Math", "Reasoning", "GK"].map((sub) => (
            <label
              key={sub}
              style={{
                color: "white",
                display: "block",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={subjects.includes(sub)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSubjects([...subjects, sub]);
                  } else {
                    setSubjects(subjects.filter((x) => x !== sub));
                  }
                }}
              />
              {" "} {sub}
            </label>
          ))}

          <label style={label}>Questions (10 - 300)</label>
          <input
            type="number"
            min="10"
            max="300"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            style={input}
          />

          <label style={label}>Timer (Minutes) (1 - 500)</label>
          <input
            type="number"
            min="1"
            max="500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Access Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <p style={note}>
            🔑 Access Password के लिए WhatsApp करें <br />
            <strong>+91 9135199189</strong>
          </p>

          <button style={button} onClick={startTest}>
            ▶ Start Advanced Mock
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* STYLES */
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
};

const title = {
  color: "white",
  textAlign: "center",
  marginBottom: "25px",
};

const label = {
  color: "white",
  display: "block",
  marginTop: "15px",
  marginBottom: "8px",
  fontWeight: "bold",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  marginBottom: "15px",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "15px",
  background: "#16a34a",
  color: "white",
  fontSize: "18px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const note = {
  color: "#cbd5e1",
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "20px",
};

export default AdvancedMock;