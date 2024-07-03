import React from "react";
import Trip from "./Trip";

const TripList = ({ trips, onDeleteTrip }) => {
    return trips.map((trip) => (
        <Trip key={trip.id} trip={trip} onDeleteTrip={onDeleteTrip} />
    ));
};

export default TripList;
