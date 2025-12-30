import './App.css'
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { TeamsPage } from './pages/Teams';

import { PrivateRoute } from './components/privateRoute';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
    return (
      <Router>
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* TODO[X]: MAKE these AUTHENTICATED ROUTES  */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/teams" element={
            <PrivateRoute>
              <TeamsPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    );
}

export default App
