import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Computer");
  const [password, setPassword] = useState("");

const PASSWORD_API =
  "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec?action=password";

const startMock = async () => {
  try {
    const res = await fetch(PASSWORD_API);
    const data = await res.json();

    console.log("API RESPONSE:", data);

    const serverPassword = String(data?.password || "").trim().toUpperCase();
    const userPassword = String(password || "").trim().toUpperCase();

    if (!serverPassword) {
      alert("❌ Server se password nahi aa raha (API issue)");
      return;
    }

    if (userPassword !== serverPassword) {
      alert("❌ Wrong Access Password");
      return;
    }

    alert("✅ Password Correct!");

    navigate("/mock", {
      state: { subject },
    });

  } catch (err) {
    console.log(err);
    alert("❌ Server Error");
  }
};
  const subjects = [
    "Computer",
    "English",
    "Reasoning",
    "GK",
    "Mixed",
  ];

  return (
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
          width: "500px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🏛 PHC MOCK PORTAL
        </h1>

        <hr />

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

          <p
            style={{
              marginTop: "12px",
              color: "#facc15",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            🔐 For Password Access Request
            <br />
            Message on WhatsApp
            <br />
            <b>+91 9135199189</b>
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Exam Pattern</h3>

          <p>✅ 50 Questions</p>
          <p>✅ 50 Minutes</p>
          <p>✅ Random Questions</p>
          <p>✅ Instant Result</p>
        </div>

        <button
          onClick={startMock}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "15px",
            fontSize: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🚀 Start Mock Test
        </button>
      </div>
    </div>
  );
}


<div style={{
  position: "fixed",
  bottom: "10px",
  width: "100%",
  textAlign: "center",
  color: "#facc15",
  fontWeight: "bold",
  fontSize: "14px"
}}>
  🚀 Build by RUT Agency (Abhishek Kumar)
</div>

export default Home;