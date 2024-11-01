import mongoose from "mongoose";
import config from "../config/config";

interface ConnectionProps {
    isConnected: boolean;
} 

const connection: ConnectionProps = { isConnected: false };

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            // console.log('Using existing db connection.')
            return;
        }
        const db = await mongoose.connect(config.mongoDb.uri);
        connection.isConnected = !!db.connections[0]?.readyState;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
