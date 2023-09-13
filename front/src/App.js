import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import Hello from "./components/dashboard/Hello";
import HorizontalNav from "./components/nav/HorizontalNav";
import LateralNav from "./components/nav/LateralNav";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
