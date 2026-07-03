import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MockTest from "./pages/MockTest";
import Result from "./pages/Result";
import GovtExams from "./pages/GovtExams";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mock" element={<MockTest />} />
      <Route path="/result" element={<Result />} />

      {/* Govt Exam Page */}
      <Route path="/govt-exams" element={<GovtExams />} />
    </Routes>
  );
}

export default App;