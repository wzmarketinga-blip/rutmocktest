function QuestionCard({
  question,
  selectedOption,
  setSelectedOption,
}) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      {/* Question */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "25px",
          color: "#111827",
          lineHeight: "35px",
        }}
      >
        {question.question}
      </div>

      {/* Options */}

      {question.options.map((option, index) => {
        const selected = selectedOption === option;

        return (
          <div key={index} style={{ marginBottom: "18px" }}>
            <button
              onClick={() => setSelectedOption(option)}
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "12px",
                border: selected
                  ? "3px solid #22c55e"
                  : "2px solid #d1d5db",

                background: selected ? "#22c55e" : "#f8fafc",

                color: selected ? "white" : "#111827",

                cursor: "pointer",

                textAlign: "left",

                fontSize: "19px",

                fontWeight: "600",

                transition: "0.3s",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: selected ? "white" : "#2563eb",
                  color: selected ? "#22c55e" : "white",
                  textAlign: "center",
                  lineHeight: "35px",
                  marginRight: "15px",
                  fontWeight: "bold",
                }}
              >
                {labels[index]}
              </span>

              {option}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default QuestionCard;