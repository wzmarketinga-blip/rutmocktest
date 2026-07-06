import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import Home from "./pages/Home";
import MockTest from "./pages/MockTest";
import Result from "./pages/Result";
import AdvancedMock from "./pages/AdvancedMock";
import Leaderboard from "./pages/Leaderboard";

import SplashScreen from "./components/SplashScreen";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mock-test" element={<MockTest />} />
      <Route path="/advanced-mock" element={<AdvancedMock />} />
      <Route path="/result" element={<Result />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;