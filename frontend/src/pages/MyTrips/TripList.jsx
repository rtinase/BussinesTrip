import React from "react";
import Trip from "./Trip";
import "./MyTrips.css";

const TripList = ({ trips, onDeleteTrip }) => {
    return (
        <div className="trip-list">
            {trips.map((trip) => (
                <Trip key={trip.id} trip={trip} onDeleteTrip={onDeleteTrip} />
            ))}
        </div>
    );
};

export default TripList;
