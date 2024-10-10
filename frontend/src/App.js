import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Streamers from "./pages/Streamers";
import Social from "./pages/Social";
import Profile from "./pages/Profile";
import Games from "./pages/Games";
import Clans from "./pages/Clans";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/streamers" element={
                    <ProtectedRoute>
                        <Streamers/>
                    </ProtectedRoute>
                    }/>
                <Route path="/social" element={
                    <ProtectedRoute>
                        <Social/>
                    </ProtectedRoute>
                    }/>
                <Route path="/profile/:username" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                    }/>
                <Route path="/games" element={
                    <ProtectedRoute>
                        <Games/>
                    </ProtectedRoute>
                    }/>
                <Route path="/clans/" element={
                    <ProtectedRoute>
                        <Clans/>
                    </ProtectedRoute>
                    }/>
                <Route path="/clans/:Clanname" element={
                    <ProtectedRoute>
                        <Clans/>
                    </ProtectedRoute>
                    }/>
                <Route path="/" element={
                    <ProtectedRoute>
                        <LandingPage/>
                    </ProtectedRoute>
                    }/>
            </Routes>
        </Router>
    );
}

export default App;
