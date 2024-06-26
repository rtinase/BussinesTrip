const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const tripsFilePath = path.join(__dirname, './trips.json');

app.use(bodyParser.json());

// Read trips
app.get('/trips', async (req, res) => {
    try {
        console.log(1);
        const data = await readFileAsync(tripsFilePath);
        console.log(2);
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading trips file:', err);
        res.status(500).send('Error reading trips file');
    }
});

// Delete a trip
app.delete('/trips/:id', async (req, res) => {
    const tripId = parseInt(req.params.id);
    try {
        let data = await readFileAsync(tripsFilePath);
        const trips = JSON.parse(data).trips;
        const newTrips = trips.filter(trip => trip.id !== tripId);

        await writeFileAsync(tripsFilePath, JSON.stringify({ trips: newTrips }));
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting trip:', err);
        res.status(500).send('Error deleting trip');
    }
});

// Add a trip
app.post('/trips', async (req, res) => {
    const newTrip = req.body;
    try {
        let data = await readFileAsync(tripsFilePath);
        const trips = JSON.parse(data).trips;
        trips.push(newTrip);

        await writeFileAsync(tripsFilePath, JSON.stringify({ trips }));
        res.json({ success: true });
    } catch (err) {
        console.error('Error adding trip:', err);
        res.status(500).send('Error adding trip');
    }
});

// Async file read/write functions
const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const writeFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/trips`);
});
