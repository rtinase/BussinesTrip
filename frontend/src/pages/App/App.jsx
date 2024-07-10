import { useState, useEffect } from "react";
import "./App.css";
import Header from "../../Components/Header";
import TripList from "./TripList";
import { fetchAllTrips, fetchAmountOfSelectedTrips, addTripToSelected } from "./AppService";
import Snackbar from "../../Components/Snackbar";

const selectedTrips = [];

export default function App() {
  const [snackbars, setSnackbars] = useState([]);
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

  const showSnackbar = (message) => {
    const id = new Date().getTime();
    setSnackbars((prevSnackbars) => [...prevSnackbars, { id, message }]);
    setTimeout(() => {
      setSnackbars((prevSnackbars) => prevSnackbars.filter((snackbar) => snackbar.id !== id));
    }, 2000);
  };

  const handleAddTripToSelected = async (trip) => {
    try {
      const amountOfMyTrips = await fetchAmountOfSelectedTrips();
      console.log(amountOfMyTrips);
      await addTripToSelected(trip, amountOfMyTrips);
      showSnackbar(`Trip ${trip.title} added to your list!`);
    } catch (error) {
      console.error("Error adding trip to selected:", error);
      showSnackbar("Error adding trip to your list.");
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
          <div className="snackbar-container">
            {snackbars.map((snackbar) => (
                <Snackbar key={snackbar.id} message={snackbar.message} />
            ))}
          </div>
        </div>
      </>
  );
}
