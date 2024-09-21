import express, { json } from 'express';
import dotenv from 'dotenv';
import contactsRouter from './routes/contactsRoute.js';
import notFound from './middleware/notFound.js';
import dbConnect from './config/dbConnect.js';
import userRouter from './routes/userRouters.js';

dotenv.config();
dbConnect();

const app = express();
const port = process.env.PORT || 2001;

//to pass json req body
app.use(express.json());

//routes
app.use('/users', userRouter)
app.use('/contacts', contactsRouter);

//errors
app.use(notFound);

app.listen(port, () => { 
    console.log(`Server running on port ${port}...`);
})