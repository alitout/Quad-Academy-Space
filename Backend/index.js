require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/routes');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});