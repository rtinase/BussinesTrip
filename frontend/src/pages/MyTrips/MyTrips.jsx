import React, { useState, useEffect } from "react";
import { deleteTrip, editTrip, deleteAllMyTrips} from "./MyTripsService";
import TripList from "./TripList";
import "./MyTrips.css";

const MyTrips = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const myTrips = await fetchTrips();
                setTrips(myTrips);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };
        fetchTrips();
    }, []);

    const handleDeleteTrip = async (id) => {
        try {
            await deleteTrip(id);
            setTrips(trips.filter(trip => trip.id !== id));
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    const handleEditTrip = async (editedTrip) => {
        try {
            await editTrip(editedTrip);
            setTrips(trips.map(trip => trip.id === editedTrip.id ? editedTrip : trip));
        } catch (error) {
            console.error("Error updating trip:", error);
        }
    };

    const handleDeleteAllTrips = async () => {
        await deleteAllMyTrips();
        setTrips([]);
    };

    return (
        <div>
            <header className="header">
                <h1>My Trips Page</h1>
                <div className="header-buttons">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}>
                        <button type="submit">Back home</button>
                    </form>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleDeleteAllTrips();
                    }}>
                        <button type="submit">Delete all my trips</button>
                    </form>
                </div>
            </header>
            <div className="my-trips">
                <TripList trips={trips} onDeleteTrip={handleDeleteTrip} onEditTrip={handleEditTrip}/>
            </div>
        </div>

    )
        ;
};

export default MyTrips;
