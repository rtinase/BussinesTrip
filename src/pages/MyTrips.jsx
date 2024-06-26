import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function MyTrips() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTrips = location.state?.myTrips || [];
    const [trips, setTrips] = useState(initialTrips);

    function returnToHome() {
        navigate("/", { state: { myTrips: trips } });
    }

    const deleteTripFromSelected = (id) => {
        const newTrips = trips.filter(trip => trip.id !== id);
        setTrips(newTrips);
    }

    function renderTrip(t) {
        return (
            <div className="product" key={t.id}>
                <figure>
                    <div>
                        <img src={"images/items/" + t.id + ".jpg"} alt="name" />
                    </div>
                    <figcaption>
                        <a href="#">{t.title}</a>
                        <div>
                            <span>
                                {t.startTrip}
                            </span>
                        </div>
                        <p>{t.description}</p>
                        <div>
                            <button type="button" onClick={() => deleteTripFromSelected(t.id)}>
                                Delete from list
                            </button>
                        </div>
                    </figcaption>
                </figure>
            </div>
        );
    }

    return (
        <div>
            <h1>My Trips Page</h1>
            <button onClick={returnToHome}>Back home</button>
            <section id="products">{trips.map(renderTrip)}</section>
        </div>
    );
}
