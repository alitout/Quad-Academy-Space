import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './Routes/routes.js';
import userRouter from './Routes/User/userRoutes.js'; // import the userRoutes file

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

// User Routes
app.use('/', userRouter); // use the userRoutes file

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});