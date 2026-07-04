import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MockTest from "./pages/MockTest";
import Result from "./pages/Result";
import GovtExams from "./pages/GovtExams";

// NEW PAGES
import AdvancedMock from "./pages/AdvancedMock";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/mock-test" element={<MockTest />} />

      <Route path="/advanced-mock" element={<AdvancedMock />} />

      <Route path="/result" element={<Result />} />

      <Route path="/leaderboard" element={<Leaderboard />} />

      <Route path="/govt-exams" element={<GovtExams />} />

    </Routes>
  );
}

export default App;