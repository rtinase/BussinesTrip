const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const tripsFilePath = path.join(__dirname, './trips.json');

app.use(bodyParser.json());
app.use(cors());

// Read trips
app.get('/trips/all', (req, res) => {
    fs.readFile(tripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        res.send(JSON.parse(data));
    });
});

// Delete a trip
app.delete('/trips/:id', (req, res) => {
    const tripId = parseInt(req.params.id);
    fs.readFile(tripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        const trips = JSON.parse(data).trips;
        const newTrips = trips.filter(trip => trip.id !== tripId);

        fs.writeFile(tripsFilePath, JSON.stringify({ trips: newTrips }), err => {
            if (err) {
                return res.status(500).send('Error writing to trips file');
            }
            res.send({ success: true });
        });
    });
});

// Add a trip (for completeness)
app.post('/trips', (req, res) => {
    const newTrip = req.body;
    fs.readFile(tripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        const trips = JSON.parse(data).trips;
        trips.push(newTrip);

        fs.writeFile(tripsFilePath, JSON.stringify({ trips }), err => {
            if (err) {
                return res.status(500).send('Error writing to trips file');
            }
            res.send({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/trips`);
});


