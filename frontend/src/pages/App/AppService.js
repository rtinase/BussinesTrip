import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchAllTrips = async () => {
    try {
        const response = await axios.get(`${API_URL}/all-trips`);
        return response.data.allTrips;
    } catch (error) {
        console.error("Error fetching trips:", error);
        throw error;
    }
};

export const fetchAmountOfSelectedTrips = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-trips/amount`);
        return response.data.amount;
    } catch (error) {
        console.error("Error fetching trip amount:", error);
        throw error;
    }
};

export const addTripToSelected = async (trip, id) => {
    const tripData = {
        id: id,
        imageId: trip.id,
        title: trip.title,
        description: trip.description,
        startTrip: trip.startTrip,
        endTrip: trip.endTrip
    };

    try {
        const response = await axios.post(`${API_URL}/my-trips/add`, tripData);
        console.log('Trip added successfully:', response.data);
    } catch (error) {
        console.error('Error adding trip:', error);
        throw error;
    }
};



export const fetchAllIds = async () => {
    try {
        const response = await axios.get("http://localhost:3001/my-trips/ids");
        return response.data.tripIds;
    } catch (error) {
        console.error("Error fetching trip ids:", error);
        throw error;
    }
};