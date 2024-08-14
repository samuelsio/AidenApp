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


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/streamers" element={<Streamers />} />
                <Route path="/social" element={<Social />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/games" element={<Games />} />
                <Route path="/clans" element={<Clans />} />
            </Routes>
        </Router>
    );
}

export default App;
