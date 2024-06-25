import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import MyTrips from "./pages/MyTrips";

export default function ConfigureRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/mytrips" element={<MyTrips />} />
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    );
}