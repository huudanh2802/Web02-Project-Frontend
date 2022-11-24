import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Menu from "./components/Menu/Menu";

import { NewGroup } from "./routes/NewGroup";
import { InviteMember } from "./routes/InviteMember";
import { GroupList } from "./routes/GroupList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/group" element={<Menu />} />
        <Route path="/grouplist" element={<GroupList />} />
        <Route path="/newgroup" element={<NewGroup />} />
        <Route path="/invite" element={<InviteMember />} />

        <Route path="" element={<Navigate to="/group" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
