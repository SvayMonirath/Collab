import "./App.css";
import { Landing } from "./pages/Main/Landing";
import { Login } from "./pages/Main/Login";
import { Register } from "./pages/Main/Register";
import { MainHome } from "./pages/Main/Home";
import { MainTeams } from "./pages/Main/Teams";
import { TeamHome } from "./pages/TeamsPages/TeamHome";


import { PrivateRoute } from "./components/privateRoute";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/MainTeams"
          element={
            <PrivateRoute>
              <MainTeams />
            </PrivateRoute>
          }
        />
        <Route
          path="/TeamHome/:teamID"
          element={
            <PrivateRoute>
              <TeamHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
