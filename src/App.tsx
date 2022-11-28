import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { NewGroupPage } from "./components/Routes/NewGroupPage/NewGroupPage";
import { InviteMember } from "./routes/InviteMember";
import { GroupList } from "./routes/GroupList";
import { ManageUser } from "./routes/ManageUser";
import { GroupInfo } from "./routes/GroupInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/grouplist" element={<GroupList />} />
        <Route path="/grouplist/:name" element={<GroupInfo />} />
        <Route path="/newgroup" element={<NewGroupPage />} />
        <Route path="/invite" element={<InviteMember />} />
        <Route path="/manageuser" element={<ManageUser />} />

        <Route path="" element={<Navigate to="/grouplist" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
