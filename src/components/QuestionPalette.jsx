function QuestionPalette({
  questions,
  currentQuestion,
  setCurrentQuestion,
  answers,
}) {
  return (
    <div
      style={{
        width: "260px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
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
        {questions.map((q, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              color:
                currentQuestion === index || answers[index]
                  ? "white"
                  : "black",
              background:
                currentQuestion === index
                  ? "#2563eb"
                  : answers[index]
                  ? "#22c55e"
                  : "#ffffff",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <p style={{ color: "white" }}>🟦 Current Question</p>
      <p style={{ color: "white" }}>🟩 Answered</p>
      <p style={{ color: "white" }}>⬜ Not Answered</p>
    </div>
  );
}

export default QuestionPalette;