import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import "./custom.scss"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
