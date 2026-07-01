import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Computer");

  const startMock = () => {
    navigate("/mock", {
      state: {
        subject,
      },
    });
  };

  const subjects = [
    "Computer",
    "English",
    "Reasoning",
    "GK",
    "Mixed",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🏛 PHC MOCK PORTAL
        </h1>

        <hr />

        <h3>Select Subject</h3>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "18px",
            marginTop: "10px",
            borderRadius: "8px",
          }}
        >
          {subjects.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "30px" }}>
          <h3>Exam Pattern</h3>

          <p>✅ 50 Questions</p>
          <p>✅ 50 Minutes</p>
          <p>✅ Random Questions</p>
          <p>✅ Instant Result</p>
        </div>

        <button
          onClick={startMock}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "15px",
            fontSize: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🚀 Start Mock Test
        </button>
      </div>
    </div>
  );
}

export default Home;