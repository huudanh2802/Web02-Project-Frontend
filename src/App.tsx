import { Route, Routes } from "react-router-dom";
import { GroupList } from "./routes/group-list/group-list";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/grouplist" element={<GroupList />} />
    </Routes>
  );
}

export default App;
