import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
    const navigate = useNavigate();

    function returnToHome() {
        navigate("/");
    }

    return (
        <div>
            <h1>My Trips Page</h1>
            <button onClick={returnToHome}>Back home</button>
        </div>
    );
};