// Budget API

const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const app = express();
const port = 3000;

app.use(cors());

app.get('/budget', (req, res) => {
    // Dynamically read the server.json file on each request
    fs.readFile('./server.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading budget data');
        } else {
            const budget = JSON.parse(data); // Parse the JSON data
            res.json(budget); // Send the parsed data as JSON
        }
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
