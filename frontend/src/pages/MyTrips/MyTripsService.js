import axios from "axios";

export const fetchTrips = async () => {
    try {
        const response = await axios.get("http://localhost:3001/my-trips");
        return response.data.myTrips;
    } catch (error) {
        console.error("Error fetching trips:", error);
        return [];
    }
};

export const deleteTrip = async (id, trips) => {
    try {
        console.log("The id of deleted trip is ", id);
        await axios.delete(`http://localhost:3001/my-trips/trip/${id}`);
        console.log("delete request is good");
        return trips.filter(trip => trip.id !== id);
    } catch (error) {
        console.error("Error deleting trip:", error);
        return trips;
    }
};

export const deleteAllMyTrips = async () => {
    try {
        await axios.delete(`http://localhost:3001/my-trips/all`);
    } catch (error) {
        console.error("Error deleting all trips:", error);
    }
};
