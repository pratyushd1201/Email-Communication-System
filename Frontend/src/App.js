import { useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Error from "./screens/Error";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import TaskCreateForm from "./screens/Tasks/Create";
import MemberCreateForm from "./screens/Member/Create";
import TaskList from "./screens/Tasks/List";
import MemberList from "./screens/Member/List";
import TaskUpdateForm from "./screens/Tasks/Update";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemberUpdateForm from "./screens/Member/Update";

//Main layout with all routes
function App() {
  const { loggedInUser } = useSelector((state) => state.auth);

  return loggedInUser ? (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-member" element={<MemberCreateForm />} />
          <Route path="/create-task" element={<TaskCreateForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/update-task/:id" element={<TaskUpdateForm />} />
          <Route path="/update-member/:id" element={<MemberUpdateForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  ) : (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
