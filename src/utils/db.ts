import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_KEY = process.env.DBCONN_URI!;


export const connectDB = async() => {
    try {
         await mongoose.connect(DB_KEY);
         console.log('Successfuly connected to MongoDB Database: symvappdb')
    } catch (err) {
        console.log('Connection to MongoDB failed:', err);
        process.exit(1);
    }
}
