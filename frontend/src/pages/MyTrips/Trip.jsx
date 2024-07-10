import React from "react";
import "./MyTrips.css";

const Trip = ({ trip, onDeleteTrip }) => {
    return (
        <div className="trip-row">
            <span className="trip-id">{trip.id}</span>
            <span className="trip-title">{trip.title}</span>
            <span className="trip-date">{trip.startTrip}</span>
            <span className="trip-date">{trip.endTrip}</span>
            <span className="trip-actions">
        <form onSubmit={(e) => { e.preventDefault(); onDeleteTrip(trip.id); }}>
          <button type="submit" className="delete-btn">
            🗑️
          </button>
        </form>
      </span>
        </div>
    );
};

export default Trip;
