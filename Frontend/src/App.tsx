import "./App.css";
import { Landing } from "./pages/Main/Landing";
import { Login } from "./pages/Main/Login";
import { Register } from "./pages/Main/Register";
import { MainHome } from "./pages/Main/Home";
import { MainTeams } from "./pages/Main/Teams";
import { TeamHome } from "./pages/TeamsPages/TeamHome";
import { MeetingAudioCallPage } from "./pages/MeetingPages/AudioCallPage";

import { PrivateRoute } from "./components/privateRoute";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainHomeUrl, MainTeamsUrl, TeamHomeUrl, MeetingAudioCallPageUrl, LandingUrl, LoginUrl, RegisterUrl } from "./urlPath";

function App() {

  return (
    <Router>
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path={LandingUrl} element={<Landing />} />
        <Route path={LoginUrl} element={<Login />} />
        <Route path={RegisterUrl} element={<Register />} />

        <Route
          path={MainHomeUrl}
          element={
            <PrivateRoute>
              <MainHome />
            </PrivateRoute>
          }
        />
        <Route
          path={MainTeamsUrl}
          element={
            <PrivateRoute>
              <MainTeams />
            </PrivateRoute>
          }
        />
        <Route
          path={TeamHomeUrl}
          element={
            <PrivateRoute>
              <TeamHome />
            </PrivateRoute>
          }
        />

        {/* Meetings Audio Page */}
        <Route
          path={MeetingAudioCallPageUrl}
          element={
            <PrivateRoute>
              <MeetingAudioCallPage />
            </PrivateRoute>
          }
        />


      </Routes>
    </Router>
  );
}

export default App;
