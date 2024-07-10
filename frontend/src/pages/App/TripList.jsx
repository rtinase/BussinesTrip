import React from "react";
import Trip from "./Trip";

const TripList = ({ trips, onAddTripToSelected }) => {
    return (
        <section id="products">
            {trips.map(trip => (
                <Trip key={trip.id} trip={trip} onAddTripToSelected={onAddTripToSelected} />
            ))}
        </section>
    );
};

export default TripList;