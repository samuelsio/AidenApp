import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./custom.scss"
import AdminDashboard from './pages/AdminDashboard';
import AdminClans from './pages/AdminClans';
import AdminGames from './pages/AdminGames';
import AdminHome from './pages/AdminHome';
import AdminStreamers from './pages/AdminStreams';
import MembersDashboard from './pages/MembersDashboard';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminClans" element={<AdminClans />} />
        <Route path="/AdminGames" element={<AdminGames />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminStreamers" element={<AdminStreamers />} />
        <Route path="/MembersDashboard" element={<MembersDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
