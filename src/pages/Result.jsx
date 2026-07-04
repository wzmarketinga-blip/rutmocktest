import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveResult } from "../services/googleSheet";
import jsPDF from "jspdf";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    total = 0,
    percent = 0,
    grade = "F",
    correct = score,
    wrong = total - score,
    skipped = 0,
    attempted = total - skipped,
    subject = "Mixed",
  } = location.state || {};

  const [name, setName] = useState("");
  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("PHC MOCK TEST RESULT", 20, 20);

  doc.setFontSize(13);

  doc.text(`Name : ${name || "Not Saved"}`, 20, 40);
  doc.text(`Subject : ${subject}`, 20, 50);

  doc.text(`Score : ${score}/${total}`, 20, 60);
  doc.text(`Correct : ${correct}`, 20, 70);
  doc.text(`Wrong : ${wrong}`, 20, 80);
  doc.text(`Skipped : ${skipped}`, 20, 90);

  doc.text(`Percentage : ${percent}%`, 20, 100);
  doc.text(`Grade : ${grade}`, 20, 110);

  doc.save("Mock_Result.pdf");
};

  const saveScore = async () => {
    if (!name.trim()) {
      alert("Please Enter Your Name");
      return;
    }

    try {
      await saveResult({
        name,
        subject,
        score,
        correct,
        wrong,
        skipped,
        percentage: percent,
        grade,
      });

      alert("✅ Result Saved Successfully");
    } catch (err) {
      alert("❌ Save Failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>🏆 MOCK TEST RESULT</h1>

        <table style={table}>
          <tbody>
            <tr>
              <td>📚 Subject</td>
              <td>{subject}</td>
            </tr>

            <tr>
              <td>✅ Correct</td>
              <td>{correct}</td>
            </tr>

            <tr>
              <td>❌ Wrong</td>
              <td>{wrong}</td>
            </tr>

            <tr>
              <td>⏭ Skipped</td>
              <td>{skipped}</td>
            </tr>

            <tr>
              <td>📝 Attempted</td>
              <td>{attempted}</td>
            </tr>

            <tr>
              <td>🎯 Score</td>
              <td>
                {score} / {total}
              </td>
            </tr>

            <tr>
              <td>📈 Percentage</td>
              <td>{percent}%</td>
            </tr>

            <tr>
              <td>🏅 Grade</td>
              <td>{grade}</td>
            </tr>
          </tbody>
        </table>

        <input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        
        <h2
  style={{
    textAlign: "center",
    color:
      grade === "A+"
        ? "#22c55e"
        : grade === "A"
        ? "#3b82f6"
        : grade === "B"
        ? "#f59e0b"
        : "#ef4444",
    marginBottom: "20px",
  }}
>
  {grade === "A+" && "🌟 Excellent Performance"}
  {grade === "A" && "👏 Very Good"}
  {grade === "B" && "🙂 Good Practice"}
  {(grade === "C" || grade === "F") && "📚 Keep Practicing"}
</h2>

        <button style={greenBtn} onClick={saveScore}>
          💾 Save Score
        </button>

        <button
  style={blueBtn}
  onClick={downloadPDF}
>
  📄 Download PDF
</button>

        <button
          style={blueBtn}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>

        <button
          style={orangeBtn}
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#1e293b",
  color: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "500px",
  boxShadow: "0 0 20px rgba(0,0,0,.4)",
};

const table = {
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  borderCollapse: "collapse",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  boxSizing: "border-box",
};

const greenBtn = {
  width: "100%",
  padding: "15px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "10px",
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
  marginBottom: "10px",
};

const orangeBtn = {
  width: "100%",
  padding: "15px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
};

export default Result;