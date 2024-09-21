import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.CONN_STRG);
        console.log('Connected to mongodb successfully!');
    } catch (error) {
        console.log(`An ocurred while connecting to mongodb: ${error}`);
        process.exit(1);
    }
}

export default dbConnect