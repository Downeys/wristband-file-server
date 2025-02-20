import mongoose from 'mongoose';
import asyncConfig from '../config/config';
import { logger } from '../../application/config/logging';

const NAMESPACE = 'mongo-repo';

interface ConnectionProps {
  isConnected: boolean;
}

const connection: ConnectionProps = { isConnected: false };

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const config = await asyncConfig;
    const db = await mongoose.connect(config.mongoDb.uri);
    connection.isConnected = !!db.connections[0]?.readyState;
  } catch (e) {
    const error = e as Error;
    logger.error(error.message, { namespace: NAMESPACE });
    throw new Error(error.message);
  }
};
export default { connectToDb };
