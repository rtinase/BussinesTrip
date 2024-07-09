const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const AllTripsFilePath = path.join(__dirname, './AllTrips.json');
const MyTripsFilePath = path.join(__dirname, './MyTrips.json');

app.use(bodyParser.json());
app.use(cors());

app.get('/all-trips', (req, res) => {
    fs.readFile(AllTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading trips file');
            return res.status(500).send('Error reading trips file');
        }
        res.send(JSON.parse(data));
        console.log('GET request /all-trips');
    });
});

app.get('/my-trips', (req, res) => {
    fs.readFile(MyTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        res.send(JSON.parse(data));
        console.log("GET request to /my-trips");
    });
});

app.get('/my-trips/amount', (req, res) => {
    fs.readFile(MyTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading trips file:', err);
            return res.status(500).send('Error reading trips file');
        }

        try {
            const myTrips = JSON.parse(data).myTrips;
            const amount = myTrips.length;
            console.log(`GET request /my-trips/amount. The number is ${String(amount)} and type is ${typeof (amount)}`)
            res.send({ amount: amount });
        } catch (parseError) {
            console.error('Error parsing selected trips file:', parseError);
            res.status(500).send('Error parsing trips file');
        }
    });
});


app.delete('/my-trips/trip/:id', (req, res) => {
    const tripId = parseInt(req.params.id);
    fs.readFile(AllTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        const myTrips = JSON.parse(data).myTrips;
        const newTrips = myTrips.filter(trip => trip.id !== tripId);

        fs.writeFile(AllTripsFilePath, JSON.stringify({ trips: newTrips }), err => {
            if (err) {
                return res.status(500).send('Error writing to trips file');
            }
            res.send({ success: true });
        });
    });
});

app.delete('/my-trips/all', (req, res) => {
    fs.readFile(MyTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading myTrips file:', err);
            return res.status(500).send('Error reading myTrips file');
        }

        try {
            const emptyTrips = { myTrips: [] };
            fs.writeFile(MyTripsFilePath, JSON.stringify(emptyTrips, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to trips file:', writeErr);
                    return res.status(500).send('Error writing to trips file');
                }
                res.send({ success: true, message: 'All trips have been deleted.' });
            });
        } catch (parseError) {
            console.error('Error parsing trips file:', parseError);
            res.status(500).send('Error parsing trips file');
        }
    });
});

app.post('/my-trips/add', (req, res) => {
    const newTrip = req.body;
    fs.readFile(MyTripsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading trips file');
        }
        const myTrips = JSON.parse(data).myTrips;
        myTrips.push(newTrip);

        fs.writeFile(MyTripsFilePath, JSON.stringify({ myTrips }), err => {
            if (err) {
                return res.status(500).send('Error writing to trips file');
            }
            res.send({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/trips and on http://localhost:${PORT}/selected-trips`);
});


