import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyTrips() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:3001/trips/all");
                setTrips(response.data.selectedTrips);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);


    const deleteTripFromSelected = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/trips/${id}`);
            const newTrips = trips.filter(trip => trip.id !== id);
            setTrips(newTrips);
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    function returnToHome() {
        navigate("/");
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
                            <span>{t.startTrip}</span>
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
