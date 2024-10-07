const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const chartModel = require("./models/chartSchema");
const url = 'mongodb://localhost:27017/chartDB';

mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to database", err);
    });


app.use(express.json());
app.use(cors());
app.use('/', express.static('public'));


app.get('/getChartData', async (req, res) => {
    try {
        const data = await chartModel.find({}); 
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.post('/addChartData', async (req, res) => {
    try {
        const { title, value, color } = req.body;
        const newChart = new chartModel({
            title: title,
            value: value,
            color: color
        });
        await newChart.save();
        res.status(201).json(newChart); 
    } catch (error) {
        console.error(error);
        res.status(400).send('Error adding data');
    }
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
