import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Locations from "./pages/Locations";
import Tiers from "./pages/Tiers";

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 Navbar appears on every page */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/tiers" element={<Tiers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
