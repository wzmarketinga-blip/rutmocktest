import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Computer");
  const [password, setPassword] = useState("");

  // 🔥 ADVANCED STATES
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(["Computer"]);
  const [questionCount, setQuestionCount] = useState(50);
  const [time, setTime] = useState(40);

  const PASSWORD_API =
    "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec?action=password";

  const subjects = [
    "Computer",
    "English",
    "Reasoning",
    "Math",
    "GK",
  ];

  const toggleSubject = (sub) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const startMock = async (mode = "normal") => {
    try {
      const res = await fetch(PASSWORD_API);
      const data = await res.json();

      const serverPassword = String(data?.password || "").trim().toUpperCase();
      const userPassword = String(password || "").trim().toUpperCase();

      if (!serverPassword) {
        alert("❌ Server se password nahi aa raha");
        return;
      }

      if (userPassword !== serverPassword) {
        alert("❌ Wrong Access Password");
        return;
      }

      // 🔥 NORMAL MODE
      if (mode === "normal") {
        navigate("/mock", {
          state: {
            subject,
            mode: "normal",
          },
        });
      }

      // 🔥 ADVANCED MODE
      else {
        if (selectedSubjects.length === 0) {
          alert("❌ At least 1 subject select karo");
          return;
        }

        navigate("/mock", {
          state: {
            mode: "advanced",
            subjects: selectedSubjects,
            questionCount,
            time,
          },
        });
      }
    } catch (err) {
      console.log(err);
      alert("❌ Server Error");
    }
  };

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            width: "520px",
            marginTop: "120px",
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            🏛 PHC MOCK PORTAL
          </h1>

          <hr />

          {/* MODE SWITCH */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <button
              onClick={() => setIsAdvanced(false)}
              style={{
                flex: 1,
                padding: "10px",
                background: !isAdvanced ? "#2563eb" : "#334155",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Normal Mock
            </button>

            <button
              onClick={() => setIsAdvanced(true)}
              style={{
                flex: 1,
                padding: "10px",
                background: isAdvanced ? "#16a34a" : "#334155",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Advanced Mock 🔥
            </button>
          </div>

          {/* NORMAL MODE */}
          {!isAdvanced && (
            <>
              <h3>Select Subject</h3>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "18px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              >
                {subjects.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </>
          )}

          {/* ADVANCED MODE */}
          {isAdvanced && (
            <>
              <h3>Select Subjects (Multi Select)</h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    style={{
                      padding: "8px 12px",
                      background: selectedSubjects.includes(sub)
                        ? "#22c55e"
                        : "#334155",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              <h3 style={{ marginTop: "15px" }}>
                Questions: {questionCount}
              </h3>

              <input
                type="range"
                min="10"
                max="200"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                style={{ width: "100%" }}
              />

              <h3>Time (Minutes): {time}</h3>

              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              />
            </>
          )}

          {/* PASSWORD */}
          <div style={{ marginTop: "20px" }}>
            <h3>Access Password</h3>

            <input
              type="password"
              placeholder="Enter Access Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "none",
              }}
            />
          </div>

          {/* BUTTONS */}
          {!isAdvanced ? (
            <button
              onClick={() => startMock("normal")}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                fontSize: "20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              🚀 Start Normal Mock
            </button>
          ) : (
            <button
              onClick={() => startMock("advanced")}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                fontSize: "20px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            >
              🔥 Start Advanced Mock
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;