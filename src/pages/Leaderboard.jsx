import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/googleSheet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    try {
      let result = await getLeaderboard();

      result.sort((a, b) => Number(b.Score) - Number(a.Score));

      setData(result);
    } catch (err) {
      alert("Leaderboard Load Failed");
    }

    setLoading(false);
  }

  return (
    <>
      <Header />

      <div style={container}>
        <h1 style={{ color: "white" }}>🏆 Leaderboard</h1>

        {loading ? (
          <h2 style={{ color: "white" }}>Loading...</h2>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Score</th>
                <th>%</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td>{item.Subject}</td>
                  <td>{item.Score}</td>
                  <td>{item.Percentage}</td>
                  <td>{item.Grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0f172a",
  padding: "30px",
};

const table = {
  width: "100%",
  background: "white",
  borderCollapse: "collapse",
};

export default Leaderboard;