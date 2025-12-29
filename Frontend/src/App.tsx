import './App.css'
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
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

          {/* TODO[]: MAKE these AUTHENTICATED ROUTES  */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    );
}

export default App
