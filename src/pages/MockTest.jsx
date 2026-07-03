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

  // 🔥 MODE SUPPORT (NORMAL + ADVANCED)
  const mode = location.state?.mode || "normal";

  const selectedSubject = location.state?.subject || "Mixed";
  const selectedSubjects = location.state?.subjects || [];
  const questionLimit = location.state?.questionCount || 50;
  const customTime = location.state?.time || 40;

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

      let finalQuestions = [];

      // 🔥 ADVANCED MODE LOGIC
      if (mode === "advanced") {
        selectedSubjects.forEach((subject) => {
          const subjectQuestions = data
            .filter((q) => q.subject === subject)
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.ceil(questionLimit / selectedSubjects.length));

          finalQuestions.push(...subjectQuestions);
        });

        finalQuestions = finalQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, questionLimit);
      }

      // 🔥 NORMAL MODE LOGIC
      else {
        if (selectedSubject === "Mixed") {
          const subjects = ["Computer", "English", "Reasoning", "Math", "GK"];

          subjects.forEach((subject) => {
            const subjectQuestions = data
              .filter((q) => q.subject === subject)
              .sort(() => Math.random() - 0.5)
              .slice(0, 10);

            finalQuestions.push(...subjectQuestions);
          });

          finalQuestions = finalQuestions.sort(() => Math.random() - 0.5);
        } else {
          finalQuestions = data
            .filter((q) => q.subject === selectedSubject)
            .sort(() => Math.random() - 0.5)
            .slice(0, 50);
        }
      }

      setQuestions(finalQuestions);
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

  function getGrade(percent) {
    if (percent >= 90) return "A+";
    if (percent >= 75) return "A";
    if (percent >= 50) return "B";
    return "C";
  }

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
        mode,
      },
    });
  };

  return (
    <>
      <Header />

      <div style={pageStyle}>
        <div style={{ width: "72%" }}>
          <h1>
            🏛 {mode === "advanced" ? "ADVANCED MOCK TEST" : selectedSubject + " MOCK TEST"}
          </h1>

          <Timer
  minutes={customTime}
  onTimeUp={handleSubmit}
/>

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

          {/* 🚀 BIG BUTTON UI FIX */}
          <div style={btnWrap}>
            <button
              onClick={() =>
                currentQuestion > 0 &&
                setCurrentQuestion(currentQuestion - 1)
              }
              style={btnStyle}
            >
              ⬅ Previous
            </button>

            <button
              onClick={() =>
                currentQuestion < questions.length - 1 &&
                setCurrentQuestion(currentQuestion + 1)
              }
              style={{ ...btnStyle, background: "#0ea5e9" }}
            >
              Next ➡
            </button>

            <button
              onClick={handleSubmit}
              style={{ ...btnStyle, background: "#16a34a" }}
            >
              ✅ Submit Test
            </button>
          </div>
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

/* ---------- STYLES ---------- */

const btnWrap = {
  display: "flex",
  gap: "15px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const btnStyle = {
  padding: "16px 32px",   // 🔥 BIGGER BUTTON
  fontSize: "20px",       // 🔥 BIGGER TEXT
  fontWeight: "bold",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "white",
  minWidth: "180px",
};

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