import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const questions = location.state?.questions || [];
  const answers = location.state?.answers || {};

  const attempted = Object.keys(answers).length;
  const correct = score;
  const wrong = attempted - correct;
  const skipped = total - attempted;
  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;

  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  // 🏆 Grade system
  const getGrade = (p) => {
    if (p >= 90) return "A+";
    if (p >= 75) return "A";
    if (p >= 50) return "B";
    return "C";
  };

  const grade = getGrade(percentage);

  // 🎉 Confetti
  useEffect(() => {
    import("canvas-confetti").then((confettiLib) => {
      confettiLib.default({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    });

    loadLeaderboard();
  }, []);

  // 📊 Load leaderboard
  const loadLeaderboard = () => {
    const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(data.sort((a, b) => b.score - a.score));
  };

  // 💾 Save to leaderboard
  const saveScore = () => {
    const playerName = name.trim() || "Anonymous";

    const newEntry = {
      name: playerName,
      score,
      total,
      percentage,
      grade,
      date: new Date().toLocaleString(),
    };

    const oldData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const updated = [...oldData, newEntry];

    localStorage.setItem("leaderboard", JSON.stringify(updated));

    loadLeaderboard();
    alert("Score saved to leaderboard 🏆");
  };

  // 📄 PDF Download
  const downloadPDF = () => {
    import("jspdf").then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;
      const doc = new jsPDF();

      doc.text("Mock Test Result", 20, 20);
      doc.text(`Score: ${score}/${total}`, 20, 40);
      doc.text(`Percentage: ${percentage}%`, 20, 50);
      doc.text(`Grade: ${grade}`, 20, 60);

      doc.save("result.pdf");
    });
  };

  const getCorrectAnswer = (q) => {
    switch (q.answer) {
      case "A":
        return q.options[0];
      case "B":
        return q.options[1];
      case "C":
        return q.options[2];
      case "D":
        return q.options[3];
      default:
        return q.answer;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ textAlign: "center" }}>🏆 MOCK TEST RESULT</h1>

        <hr />

        <h2>Score : {score} / {total}</h2>
        <h2 style={{ color: "cyan" }}>🏅 Grade : {grade}</h2>

        <h3 style={{ color: "lightgreen" }}>✅ Correct : {correct}</h3>
        <h3 style={{ color: "tomato" }}>❌ Wrong : {wrong}</h3>
        <h3 style={{ color: "gold" }}>⏭ Skipped : {skipped}</h3>
        <h3>📝 Attempted : {attempted}</h3>

        {/* 📊 Progress Bar */}
        <div style={styles.progressBar}>
          <div
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(to right, #22c55e, #06b6d4)",
              height: "100%",
            }}
          />
        </div>

        <h3>📊 Percentage : {percentage}%</h3>

        <hr />

        {/* 🏆 Leaderboard Input */}
        <h2>🏆 Save to Leaderboard</h2>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button onClick={saveScore} style={styles.saveBtn}>
          💾 Save Score
        </button>

        <button onClick={downloadPDF} style={styles.btnPDF}>
          📄 Download PDF
        </button>

        <hr />

        {/* 🏆 Leaderboard */}
        <h2>🏅 Leaderboard (Top Scores)</h2>

        {leaderboard.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          leaderboard
            .slice(0, 10)
            .map((item, index) => (
              <div key={index} style={styles.lbItem}>
                <h3>
                  #{index + 1} {item.name}
                </h3>
                <p>
                  Score: {item.score}/{item.total} | {item.percentage}% | {item.grade}
                </p>
              </div>
            ))
        )}

        <hr />

        <h2>Answer Review</h2>

        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const correctAnswer = getCorrectAnswer(q);
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div key={index} style={styles.qBox}>
              <h3>Q{index + 1}. {q.question}</h3>

              <p>
                <strong>Your Answer : </strong>
                <span
                  style={{
                    color: !userAnswer
                      ? "gold"
                      : isCorrect
                      ? "lightgreen"
                      : "tomato",
                  }}
                >
                  {userAnswer || "Skipped"}
                </span>
              </p>

              <p>
                <strong>Correct Answer : </strong>
                <span style={{ color: "lightgreen" }}>
                  {correctAnswer}
                </span>
              </p>
            </div>
          );
        })}

        <button onClick={() => navigate("/")} style={styles.homeBtn}>
          🏠 Back To Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "30px",
  },
  card: {
    maxWidth: "900px",
    margin: "auto",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
  },
  progressBar: {
    width: "100%",
    height: "15px",
    background: "#475569",
    borderRadius: "10px",
    overflow: "hidden",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
  },
  saveBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  btnPDF: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  lbItem: {
    background: "#334155",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
  },
  qBox: {
    background: "#334155",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  homeBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    cursor: "pointer",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
  },
};

export default Result;