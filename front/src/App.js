import Hello from "./components/dashboard/Hello";
import HorizontalNav from "./components/nav/HorizontalNav";
import LateralNav from "./components/nav/LateralNav";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <HorizontalNav />
      <div style={{ display: "flex" }}>
      <LateralNav />
      <Hello />
     <Dashboard />
      </div>
    </div>
  );
}

export default App;
