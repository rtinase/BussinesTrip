import { useState, useEffect } from "react";
import "./App.css";
import Header from "../../Components/Header";
import TripList from "./TripList";
import { fetchAllTrips, fetchAmountOfSelectedTrips, addTripToSelected } from "./AppService";

const selectedTrips = [];

export default function App() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [allTrips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const trips = await fetchAllTrips();
        setTrips(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    getTrips();
  }, []);

  const showSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);
  };

  const handleAddTripToSelected = async (trip) => {
    try {
      const amountOfMyTrips = await fetchAmountOfSelectedTrips();
      console.log(amountOfMyTrips);
      await addTripToSelected(trip, amountOfMyTrips);
      showSnackbar();
    } catch (error) {
      console.error("Error adding trip to selected:", error);
    }
  };

  return (
      <>
        <div>
          <Header myTripsFromApp={selectedTrips} />
          <main>
            <section id="filters">
              <label htmlFor="month">Filter by Month:</label>
              <select id="size">
                <option value="">All months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
              </select>
            </section>
            <TripList trips={allTrips} onAddTripToSelected={handleAddTripToSelected} />
          </main>
          <div id="snackbar" className={`snackbar ${snackbarVisible ? 'show' : ''}`}>
            Trip added to your list!
          </div>
        </div>
      </>
  );
}
