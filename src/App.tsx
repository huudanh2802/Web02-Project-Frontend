import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/group" element={<Menu />} />
        <Route path="" element={<Navigate to="/group" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
