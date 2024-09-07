import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/auth/login';
import Dashboard  from './component/pages/dashboard';
function App() {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
