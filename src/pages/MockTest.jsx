import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";
import { getQuestions } from "../services/googleSheet";

import Header from "../components/Header";
import Footer from "../components/Footer";

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
        const subjects = ["Computer", "English", "Reasoning", "Math", "GK"];

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

      alert("Questions Load Error\n\n" + error.name + "\n" + error.message);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={centerStyle}>Loading Questions...</div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <Header />
        <div style={centerStyle}>No Questions Found</div>
      </>
    );
  }

  const q = questions[currentQuestion];

  // 🏆 Grade function
  function getGrade(percent) {
    if (percent >= 90) return "A+";
    if (percent >= 75) return "A";
    if (percent >= 50) return "B";
    return "C";
  }

  // 📊 MAIN FIXED SUBMIT LOGIC
  const handleSubmit = () => {
    let score = 0;

    questions.forEach((question, index) => {
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

      const userAnswer = (answers[index] || "").trim();

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    const total = questions.length;
    const percent = (score / total) * 100;
    const grade = getGrade(percent);

    navigate("/result", {
      state: {
        score,
        total,
        percent: percent.toFixed(2),
        grade,
        questions,
        answers,
      },
    });
  };

  return (
    <>
      <Header />

      <div style={pageStyle}>
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
            ⬅ Previous
          </button>

          <button
            onClick={() =>
              currentQuestion < questions.length - 1 &&
              setCurrentQuestion(currentQuestion + 1)
            }
          >
            Next ➡
          </button>

          <button onClick={handleSubmit}>
            ✅ Submit Test
          </button>
        </div>

        <QuestionPalette
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          answers={answers}
        />
      </div>

      <Footer />
    </>
  );
}

const centerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px",
  fontWeight: "bold",
  background: "#0f172a",
  color: "white",
};

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  padding: "30px",
  paddingTop: "120px",
};

export default MockTest;