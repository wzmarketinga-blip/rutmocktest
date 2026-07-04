function QuestionPalette({
  questions,
  currentQuestion,
  setCurrentQuestion,
  answers,
  visited,
  review,
}) {
  const answered = Object.keys(answers).length;
  const notAnswered = questions.length - answered;

  return (
    <div
      style={{
        width: "290px",
        background: "#111827",
        padding: "20px",
        borderRadius: "15px",
        position: "sticky",
        top: "100px",
        height: "fit-content",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }}
    >
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Question Palette
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "10px",
        }}
      >
        {questions.map((q, index) => {
         let bg = "#ffffff";
let color = "#111";

if (visited[index]) {
  bg = "#6b7280";
  color = "white";
}

if (answers[index]) {
  bg = "#16a34a";
  color = "white";
}

if (review[index]) {
  bg = "#facc15";
  color = "black";
}

if (currentQuestion === index) {
  bg = "#2563eb";
  color = "white";
}

          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                background: bg,
                color: color,
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <hr
        style={{
          margin: "20px 0",
          borderColor: "#374151",
        }}
      />

      <div style={{ color: "white", lineHeight: "30px" }}>
  <div>🟦 Current Question</div>
  <div>🟩 Answered : {answered}</div>
  <div>🟨 Review : {Object.keys(review).length}</div>
  <div>⬛ Visited : {Object.keys(visited).length}</div>
  <div>⬜ Remaining : {notAnswered}</div>
  <div>📚 Total : {questions.length}</div>
</div>
    </div>
  );
}

export default QuestionPalette;