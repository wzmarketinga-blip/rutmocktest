import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";
import { getQuestions } from "../services/googleSheet";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MockTest() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SUPPORT NORMAL + ADVANCED MOCK
  const selectedSubject = location.state?.subject;
  const selectedSubjects = location.state?.subjects;

  const questionLimit = location.state?.questionCount || 50;
  const customTime = Number(location.state?.time || 40);
  console.log("========== MOCK TEST DEBUG ==========");
console.log("location.state =", location.state);
console.log("Received Time =", location.state?.time);
console.log("Custom Time =", customTime);
console.log("Question Count =", questionLimit);
console.log("=====================================");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const [visited, setVisited] = useState({});
  const [review, setReview] = useState({});

  // 🔐 SECURITY GUARD (IMPORTANT)
  const isAllowed =
    location.state?.questionCount &&
    (location.state?.subject || location.state?.subjects);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const data = await getQuestions();

      let finalQuestions = [];

      // ✅ ADVANCED MOCK (MULTI SUBJECT)
      if (selectedSubjects && selectedSubjects.length > 0) {
        finalQuestions = data
          .filter((q) => selectedSubjects.includes(q.subject))
          .sort(() => Math.random() - 0.5)
          .slice(0, questionLimit);
      }

      // ✅ SINGLE SUBJECT
      else if (selectedSubject && selectedSubject !== "Mixed") {
        finalQuestions = data
          .filter(
            (q) =>
              q.subject.toLowerCase() === selectedSubject.toLowerCase()
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, questionLimit);
      }

      // ✅ MIXED
      else {
        finalQuestions = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, questionLimit);
      }

      setQuestions(finalQuestions);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Unable to Load Questions");
    }
  }

  useEffect(() => {
    setVisited((prev) => ({
      ...prev,
      [currentQuestion]: true,
    }));
  }, [currentQuestion]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={centerStyle}>Loading Questions...</div>
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
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

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

      if (userAnswer === "") skipped++;
      else if (userAnswer === correctAnswer) {
        score++;
        correct++;
      } else {
        wrong++;
      }
    });

    const total = questions.length;
    const attempted = total - skipped;
    const percent = ((score / total) * 100).toFixed(2);
    const grade = getGrade(percent);

    navigate("/result", {
      state: {
        subject: selectedSubject || selectedSubjects,
        score,
        total,
        correct,
        wrong,
        skipped,
        attempted,
        percent,
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
          <h1>🧠 Mock Test</h1>

          <Timer minutes={customTime} onTimeUp={handleSubmit} />

          <h2>
            Question {currentQuestion + 1} / {questions.length}
          </h2>

          <QuestionCard
            question={q}
            selectedOption={answers[currentQuestion]}
            setSelectedOption={(option) => {
              setAnswers({
                ...answers,
                [currentQuestion]: option,
              });
            }}
          />

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
              style={{ ...btnStyle, background: "#16a34a" }}
              onClick={handleSubmit}
            >
              ✅ Submit Test
            </button>

            <button
              style={{ ...btnStyle, background: "#f59e0b" }}
              onClick={() =>
                setReview({
                  ...review,
                  [currentQuestion]: true,
                })
              }
            >
              ⭐ Mark for Review
            </button>
          </div>
        </div>

        <QuestionPalette
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          answers={answers}
          visited={visited}
          review={review}
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
  padding: "16px 32px",
  fontSize: "20px",
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