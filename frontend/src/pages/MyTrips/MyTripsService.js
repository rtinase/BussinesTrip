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
        await axios.delete(`http://localhost:3001/trips/${id}`);
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
