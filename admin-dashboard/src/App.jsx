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
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AdminDashboard/>
          </ProtectedRoute>} />
        <Route path="/AdminClans" element={<ProtectedRoute>
            <AdminClans/>
          </ProtectedRoute>} />
        <Route path="/AdminGames" element={<ProtectedRoute>
            <AdminGames/>
          </ProtectedRoute>} />
        <Route path="/AdminHome" element={<ProtectedRoute>
            <AdminHome/>
          </ProtectedRoute>} />
        <Route path="/AdminStreams" element={<ProtectedRoute>
            <AdminStreams/>
          </ProtectedRoute>} />
        <Route path="/MembersDashboard/" element={<ProtectedRoute>
            <MembersDashboard/>
          </ProtectedRoute>} />
        <Route path="/MembersDashboard/:username" element={<ProtectedRoute>
            <MembersDashboard/>
          </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
