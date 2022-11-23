import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import "./components/Menu/Menu.css";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" />
      </Routes>
    </Router>
  );
}

export default App;
