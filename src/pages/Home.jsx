import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Computer");
  const [password, setPassword] = useState("");

  const PASSWORD_API =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSaT5jhbOl9jHBrJoBE_YMlVairz-XHfCM95VjDXgHHPfpuYc9yXSml9TmkCFx2zxQYnJNsRhZFKTZoa853qdTCmXBzNrYh6fepxE8hb6xKtJVkY2fSGvuAWONRSSwLGQ3FcrX2ms0kmkryTptKO49T--OQPTV-oaicaBf_6vdNdMrNn2gB1QjY7Do5WTtY2Xa3nMUP_xdGM6GozhAf_QtcxAk2zPyyjjrMYSOUr5W1Y3HsRl93jFlVwG2-k1KAzFAZEiDl-QH2l68u5T8iU5x-G9Y72oGWZ_zEZpXENvGSx4LJHAY&lib=Mvo2jxYrfX3XUZ-OiYuUhmHTbuO4E8RXv";

  const startMock = async () => {
    try {
      const res = await fetch(PASSWORD_API);
      const data = await res.json();

      if (password.trim() !== data.password) {
        alert("❌ Wrong Access Password");
        return;
      }

      navigate("/mock", {
        state: {
          subject,
        },
      });
    } catch (err) {
      alert("Password Server Error");
      console.log(err);
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

export default Home;