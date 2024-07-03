import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import App from "./pages/App/App";
import MyTrips from "./pages/MyTrips/MyTrips";

export default function ConfigureRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    );
}