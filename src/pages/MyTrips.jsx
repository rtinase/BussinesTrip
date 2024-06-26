import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyTrips() {
    const navigate = useNavigate();
    const location = useLocation();
    const trips = location.state?.myTrips || [];
    function returnToHome() {
        navigate("/");
    }

    function renderTrip(t) {
        return (
            <div className="product" key={t.id}>
                <figure>
                    <div>
                        <img src={"images/items/" + t.id + ".jpg"} alt="name " />
                    </div>
                    <figcaption>
                        <a href="#. . . ">{t.title}</a>
                        <div>
                            <span>
                                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
                            </span>
                        </div>
                        <p>{t.description}</p>
                        <div>
                            <button type="button">
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


};