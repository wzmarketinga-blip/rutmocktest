function QuestionCard({
  question,
  selectedOption,
  setSelectedOption,
}) {
  const labels = ["A", "B", "C", "D"];

  return (
    <>
      <div
        style={{
          background: "white",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>{question.question}</h2>
      </div>

      {question.options.map((option, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <button
            onClick={() => setSelectedOption(option)}
            style={{
              width: "100%",
              padding: "15px",
              textAlign: "left",
              fontSize: "18px",
              cursor: "pointer",
              border: "none",
              borderRadius: "8px",
              background:
                selectedOption === option
                  ? "#22c55e"
                  : "#2563eb",
              color: "white",
            }}
          >
            <b>{labels[index]}.</b> {option}
          </button>
        </div>
      ))}
    </>
  );
}

export default QuestionCard;