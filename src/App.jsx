import { React, useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Components/Header";
import axios from "axios";

const selectedTrips = [];

export default function App() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("./trips.json");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);


  const showSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);
  };

  function addTripToSelected(trip) {
    selectedTrips.push(trip);
    showSnackbar();
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
              <button type="button" onClick={() => addTripToSelected(t)}>
                Add to Triplist
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <>
      <div>
        <Header myTripsFromApp={selectedTrips} />
        <main>
          <section id="filters">
            <label htmlFor="month">Filter by Month:</label>{" "}
            <select id="size">
              <option value="">All months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
            </select>
          </section>
          <section id="products">{trips.map(renderTrip)}</section>
        </main>
        <div id="snackbar" className={`snackbar ${snackbarVisible ? 'show' : ''}`}>
          Trip added to your list!
        </div>
      </div>
      <Footer />
    </>
  );
}


