function Header() {
  return (
    <>
      <div
        style={{
          background: "#0b3d91",
          color: "white",
          padding: "12px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🏛 PHC MOCK TEST PORTAL
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
          🏛 Welcome to PHC Mock Test Portal | 📚 Practice Daily • Improve Accuracy • Crack PHC Exam | ⏱ 40 Minutes • 50 Questions | 🚀 Developed by RUT Agency (Raunak Kumar)
        </marquee>
      </div>
    </>
  );
}

export default Header;