import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";
import { getQuestions } from "../services/googleSheet";

function MockTest() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSubject = location.state?.subject || "Mixed";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadQuestions();
  }, []);

async function loadQuestions() {
  try {
    const data = await getQuestions();

    if (selectedSubject === "Mixed") {
      const subjects = [
        "Computer",
        "English",
        "Reasoning",
        "Math",
        "GK",
      ];

      let finalQuestions = [];

      subjects.forEach((subject) => {
        const subjectQuestions = data
          .filter((q) => q.subject === subject)
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        finalQuestions.push(...subjectQuestions);
      });

      finalQuestions.sort(() => Math.random() - 0.5);

      setQuestions(finalQuestions);
    } else {
      const filteredQuestions = data
        .filter((q) => q.subject === selectedSubject)
        .sort(() => Math.random() - 0.5)
        .slice(0, 50);

      setQuestions(filteredQuestions);
    }

    setLoading(false);

  } catch (error) {
    console.error(error);

    alert(
      "Questions Load Error\n\n" +
      error.name +
      "\n" +
      error.message
    );
  }
}
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Loading Questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div
        style={{
          color: "white",
          background: "#0f172a",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        No Questions Found
      </div>
    );
  }

  const q = questions[currentQuestion];

const handleSubmit = () => {
  let score = 0;

  questions.forEach((question, index) => {
    // Sheet me Answer A/B/C/D hai usko actual option me convert karo
    let correctAnswer = "";

    switch ((question.answer || "").trim()) {
      case "A":
        correctAnswer = question.options[0];
        break;

      case "B":
        correctAnswer = question.options[1];
        break;

      case "C":
        correctAnswer = question.options[2];
        break;

      case "D":
        correctAnswer = question.options[3];
        break;

      default:
        correctAnswer = question.answer;
    }

    // Extra spaces hata do
    const userAnswer = (answers[index] || "").trim();

    if (userAnswer === correctAnswer) {
      score++;
    }
  });

  navigate("/result", {
    state: {
      score,
      total: questions.length,
      questions,
      answers,
    },
  });
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      <div style={{ width: "72%" }}>
        <h1>🏛 {selectedSubject} MOCK TEST</h1>

        <Timer onTimeUp={handleSubmit} />

        <h2>
          Question {currentQuestion + 1} / {questions.length}
        </h2>

        <QuestionCard
          question={q}
          selectedOption={answers[currentQuestion]}
          setSelectedOption={(option) =>
            setAnswers({
              ...answers,
              [currentQuestion]: option,
            })
          }
        />

        <br />

        <button
          onClick={() =>
            currentQuestion > 0 &&
            setCurrentQuestion(currentQuestion - 1)
          }
        >
          Previous
        </button>

        <button
          style={{ marginLeft: 20 }}
          onClick={() =>
            currentQuestion < questions.length - 1 &&
            setCurrentQuestion(currentQuestion + 1)
          }
        >
          Next
        </button>

        <button
          onClick={handleSubmit}
          style={{
            marginLeft: 20,
            background: "green",
            color: "white",
          }}
        >
          Submit Test
        </button>
      </div>

      <QuestionPalette
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        answers={answers}
      />
    </div>
  );
}<div style={{
  position: "fixed",
  bottom: "12px",
  left: "0",
  width: "100%",
  textAlign: "center",
  zIndex: 9999,
  pointerEvents: "none"
}}>
  <span style={{
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "20px",
    background: "rgba(0,0,0,0.6)",
    color: "#facc15",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "1px",
    animation: "floatUpDown 2s ease-in-out infinite, glow 1.5s ease-in-out infinite"
  }}>
    🚀 Build by RUT Agency (Abhishek Kumar)
  </span>

  <style>{`
    @keyframes floatUpDown {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }

    @keyframes glow {
      0% { box-shadow: 0 0 5px #facc15; }
      50% { box-shadow: 0 0 20px #facc15; }
      100% { box-shadow: 0 0 5px #facc15; }
    }
  `}</style>
</div>




export default MockTest;