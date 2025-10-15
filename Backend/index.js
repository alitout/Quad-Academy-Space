import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './Routes/routes.js';
import authRoutes from './Routes/authRoutes.js';
import userRouter from './Routes/User/userRoutes.js'; // import the userRoutes file
import programsRouter from './Routes/Program/programsRoutes.js'; // import the programsRoutes file

dotenv.config();


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

// Auth Routes
app.use('/', authRoutes); // use the authRoutes file

// User Routes
app.use('/', userRouter); // use the userRoutes file

// Program Routes
app.use('/', programsRouter); // use the programsRoutes file

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});