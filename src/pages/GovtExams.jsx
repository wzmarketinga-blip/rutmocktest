import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function GovtExams() {
  const navigate = useNavigate();

  const [selectedExam, setSelectedExam] = useState(null);

  const examCategories = {
    SSC: [
      "SSC Stenographer",
      "SSC CHSL",
      "SSC CGL (Tier-I)",
      "SSC MTS",
      "SSC GD Constable",
    ],

    Police: [
      "Delhi Police Constable",
      "Delhi Police MTS",
      "Bihar Police Constable",
      "Bihar Daroga (SI)",
      "Bihar CSBC Driver",
      "Bihar Forest Guard",
      "UP Police Constable",
      "UP Police SI",
      "CISF Head Constable",
      "CRPF Head Constable",
      "BSF Head Constable",
    ],

    Railway: [
      "RRB NTPC",
      "RRB Group D",
      "RRB ALP",
      "RPF Constable",
      "RPF SI",
    ],

    Banking: [
      "IBPS Clerk",
      "IBPS PO",
      "SBI Clerk",
      "SBI PO",
      "LIC Assistant",
      "LIC AAO",
    ],

    Other: [
      "ESIC UDC",
      "FCI Assistant Grade III",
    ],
  };

  const startExam = () => {
    if (!selectedExam) {
      alert("❌ Please Select Exam");
      return;
    }

    navigate("/mock", {
      state: {
        mode: "govt",
        exam: selectedExam,
      },
    });
  };

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "120px 20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            🏛 Government Exam Mock Tests
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#cbd5e1",
              marginBottom: "35px",
            }}
          >
            Select your target exam and start a real exam pattern mock test.
          </p>
                    {Object.entries(examCategories).map(([category, exams]) => (
            <div key={category} style={{ marginBottom: "35px" }}>
              <h2
                style={{
                  color: "#38bdf8",
                  marginBottom: "15px",
                  borderBottom: "2px solid #334155",
                  paddingBottom: "8px",
                }}
              >
                📂 {category}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "15px",
                }}
              >
                {exams.map((exam) => (
                  <div
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    style={{
                      background:
                        selectedExam === exam ? "#16a34a" : "#1e293b",
                      border:
                        selectedExam === exam
                          ? "2px solid #22c55e"
                          : "2px solid transparent",
                      borderRadius: "12px",
                      padding: "18px",
                      cursor: "pointer",
                      transition: "0.3s",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    📝 {exam}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#22c55e" }}>
              Selected Exam
            </h2>

            <h3 style={{ color: "#facc15" }}>
              {selectedExam || "No Exam Selected"}
            </h3>

            <button
              onClick={startExam}
              style={{
                marginTop: "20px",
                padding: "16px 45px",
                fontSize: "20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🚀 Start Government Mock Test
            </button>
          </div>
                  </div>
      </div>

      <Footer />
    </>
  );
}

export default GovtExams;