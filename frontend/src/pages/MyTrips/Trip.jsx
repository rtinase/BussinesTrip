import React from "react";

const Trip = ({ trip, onDeleteTrip }) => {
    return (
        <div className="product">
            <figure>
                <div>
                    <img src={"images/items/" + trip.id + ".jpg"} alt="name" />
                </div>
                <figcaption>
                    <div>
                        <span>ID: {trip.id}</span>
                    </div>
                    <a href="#">{trip.title}</a>
                    <div>
                        <span>{trip.startTrip}</span>
                    </div>
                    <p>{trip.description}</p>
                    <div>
                        <button type="button" onClick={() => onDeleteTrip(trip.id)}>
                            Delete from list
                        </button>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
};

export default Trip;
