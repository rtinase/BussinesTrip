import { useState, useEffect } from "react";
import "./App.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import axios from "axios";

const selectedTrips = [];

export default function App() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [allTrips, setTrips] = useState([]);
  const [amountSelectedTrips, setAmountSelectedTrips] = useState(0);


  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:3001/all-trips");
        setTrips(response.data.allTrips);
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


  async function getAmountOfSelectedTrips() {
    try {
      const response = await axios.get("http://localhost:3001/my-trips/amount");
      console.log("Response data:", response.data); // Debugging: log the response
      const amount = response.data.amount;
      console.log("Parsed amount:", amount); // Debugging: log the parsed amount
      setAmountSelectedTrips(amount);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }

  function addTripToSelected(trip) {
    const tripData = {
      id: amountSelectedTrips + 1,
      title: trip.title,
      description: trip.description,
      startTrip: trip.startTrip,
      endTrip: trip.endTrip
    };
    axios.post('http://localhost:3001/my-trips/add', tripData)
      .then(response => {
        console.log('Trip added successfully:', response.data);
        // Optionally, update state or do something else on success
      })
      .catch(error => {
        console.error('Error adding trip:', error);
        // Handle errors if necessary
      });

  }

  function handleAddTripToSelected(trip) {
    getAmountOfSelectedTrips();
    console.log(amountSelectedTrips);
    addTripToSelected(trip);
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
              <button type="button" onClick={() => handleAddTripToSelected(t)}>
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
          <section id="products">{allTrips.map(renderTrip)}</section>
        </main>
        <div id="snackbar" className={`snackbar ${snackbarVisible ? 'show' : ''}`}>
          Trip added to your list!
        </div>
      </div>
      <Footer />
    </>
  );
}


