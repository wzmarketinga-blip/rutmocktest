import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(90deg,#0b3d91,#1d4ed8)",
          color: "white",
          padding: "15px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,.3)",
        }}
      >
        <h2 style={{ margin: 0 }}>
          🏛 PHC MOCK TEST PORTAL
        </h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🏠 Home
          </Link>

          <Link
            to="/leaderboard"
            style={{
              color: "#FFD700",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🏆 Leaderboard
          </Link>

          <Link
            to="/govt-exams"
            style={{
              color: "#FFD700",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🎯 Govt Exam Mock
          </Link>
        </div>
      </div>

      <div
        style={{
          background: "#ffcc00",
          color: "#000",
          fontWeight: "bold",
          padding: "8px 0",
        }}
      >
        <marquee scrollAmount="6">
          🏛 Welcome to PHC Mock Test Portal |
          📚 Practice Daily • Improve Accuracy • Crack Government Exams |
          🎯 NEW: SSC • Railway • Police • Banking Mock Tests Added |
          🚀 Developed by RUT Agency (Raunak Kumar)
        </marquee>
      </div>
    </>
  );
}

export default Header;