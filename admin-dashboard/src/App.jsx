import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./custom.scss"
import AdminDashboard from './pages/AdminDashboard';
import AdminClans from './pages/AdminClans';
import AdminGames from './pages/AdminGames';
import AdminHome from './pages/AdminHome';
import AdminStreams from './pages/AdminStreams';
import MembersDashboard from './pages/MembersDashboard';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/AdminClans" element={<AdminClans />} />
        <Route path="/AdminGames" element={<AdminGames />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminStreams" element={<AdminStreams />} />
        <Route path="/MembersDashboard/" element={<MembersDashboard />} />
        <Route path="/MembersDashboard/:username" element={<MembersDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
