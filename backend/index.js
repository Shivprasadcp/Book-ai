import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();

app.use(express.json());   //middleware for parsing request body  // allow all origins with default of cors(*)

app.use(cors());   //middleware for handling cors policy

// app.use(                                 // allow custom origins
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],

// }))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to backend dev')
});

app.use('/books', booksRoute);
mongoose
    .connect(mongoDBURL, {
        useNewUrlParser: true ,
        // useCreateIndex: true ,
        useUnifiedTopology: true ,
        // useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`App is running on port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })