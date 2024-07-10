import React from "react";
import Trip from "./Trip";
import "./MyTrips.css";

const TripList = ({ trips, onDeleteTrip }) => {
    return (
        <div className="trip-list">
            <div className="trip-row trip-header">
                <span className="trip-id">ID</span>
                <span className="trip-title">Title</span>
                <span className="trip-date">Start Date</span>
                <span className="trip-date">End Date</span>
                <span className="trip-actions">Actions</span>
            </div>
            {trips.map(trip => (
                <Trip key={trip.id} trip={trip} onDeleteTrip={onDeleteTrip} />
            ))}
        </div>
    );
};

export default TripList;