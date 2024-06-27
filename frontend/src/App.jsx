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
        const response = await axios.get("http://localhost:3001/trips");
        setTrips(response.data.trips);
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
    const tripData = {
      title: trip.title,
      description: trip.description,
      startTrip: trip.startTrip,
      endTrip: trip.endTrip
    };
    axios.post('http://localhost:3001/selected-trips/add', tripData)
      .then(response => {
        console.log('Trip added successfully:', response.data);
        // Optionally, update state or do something else on success
      })
      .catch(error => {
        console.error('Error adding trip:', error);
        // Handle errors if necessary
      });

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


