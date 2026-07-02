import { useLocation, useNavigate } from "react-router-dom";

function Result() {

  console.log("NEW RESULT PAGE");
  console.log("NEW RESULT PAGE LOADED");
  const navigate = useNavigate();
  const location = useLocation();
   console.log("RESULT PAGE LOADED");
  console.log(location.state);
  console.log(location.state);

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const questions = location.state?.questions || [];
  const answers = location.state?.answers || {};

  const attempted = Object.keys(answers).length;
  const correct = score;
  const wrong = attempted - correct;
  const skipped = total - attempted;
  const percentage =
    total > 0 ? ((score / total) * 100).toFixed(2) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🏆 MOCK TEST RESULT</h1>

        <hr />

        <h2>Score : {score} / {total}</h2>

        <h3 style={{ color: "lightgreen" }}>
          ✅ Correct : {correct}
        </h3>

        <h3 style={{ color: "tomato" }}>
          ❌ Wrong : {wrong}
        </h3>

        <h3 style={{ color: "gold" }}>
          ⏭ Skipped : {skipped}
        </h3>

        <h3>📝 Attempted : {attempted}</h3>

        <h3>📊 Percentage : {percentage}%</h3>

        <hr />

        <h2>Answer Review</h2>

        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === q.answer;

          return (
            <div
              key={index}
              style={{
                background: "#334155",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>
                Q{index + 1}. {q.question}
              </h3>

              <p>
                <strong>Your Answer : </strong>

                <span
                  style={{
                    color:
                      userAnswer == null
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
                  {q.answer}
                </span>
              </p>

              {!isCorrect && userAnswer && (
                <p style={{ color: "tomato" }}>
                  ❌ Wrong Answer
                </p>
              )}

              {isCorrect && (
                <p style={{ color: "lightgreen" }}>
                  ✅ Correct Answer
                </p>
              )}

              {!userAnswer && (
                <p style={{ color: "gold" }}>
                  ⏭ Question Skipped
                </p>
              )}
            </div>
          );
        })}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            cursor: "pointer",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          🏠 Back To Home
        </button>
      </div>
    </div>
  );
}

export default Result;