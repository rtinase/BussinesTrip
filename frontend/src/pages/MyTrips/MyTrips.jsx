import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripList from "./TripList";
import { fetchTrips, deleteTrip, deleteAllMyTrips } from "./MyTripsService";
import "./MyTrips.css";

export default function MyTrips() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getTrips = async () => {
            const tripsData = await fetchTrips();
            setTrips(tripsData);
        };

        getTrips();
    }, []);

    const handleDeleteTrip = async (id) => {
        const newTrips = await deleteTrip(id, trips);
        setTrips(newTrips);
    };

    const handleDeleteAllTrips = async () => {
        await deleteAllMyTrips();
        setTrips([]);
    };

    return (
        <div>
            <h1>My Trips Page</h1>
            <form onSubmit={() => navigate("/")}>
                <button type="submit">Back home</button>
            </form>
            <form onSubmit={(e) => {e.preventDefault(); handleDeleteAllTrips();}}>
                <button type="submit">Delete all my trips</button>
            </form>
            <div className="list">
                <TripList trips={trips} onDeleteTrip={handleDeleteTrip}/>
            </div>
        </div>
    );
}
