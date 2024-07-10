import React from "react";

const Trip = ({ trip, onAddTripToSelected }) => {
    return (
        <div className="product" key={trip.id}>
            <figure>
                <div>
                    <img src={"images/items/" + trip.id + ".jpg"} alt="name " />
                </div>
                <figcaption>
                    <a href="#. . . ">{trip.title}</a>
                    <div>
                        <span>ID: {trip.id}</span>
                    </div>
                    <div>
            <span>
              {trip.startTrip[2] + "-" + trip.startTrip[1] + "-" + trip.startTrip[0]}
            </span>
                    </div>
                    <p>{trip.description}</p>
                    <div>
                        <form onSubmit={(e) => {e.preventDefault(); onAddTripToSelected(trip);}}>
                            <button type="submit">Add to Triplist</button>
                        </form>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
};

export default Trip;
