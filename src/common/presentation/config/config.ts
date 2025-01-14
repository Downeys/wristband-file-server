import dotenv from 'dotenv';
import { DEFAULT_PORT } from '../constants/serverConstants';

dotenv.config();

export interface RawEnvVars {
    port: string | undefined;
}

interface ServerProps {
    port: number;
}

interface Config {
    server: ServerProps;
}

const envVars: RawEnvVars = {
    port: process.env.PORT,
};

export const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    const server: ServerProps = {
        port: c.port ? +c.port : DEFAULT_PORT,
    };

    return {
        server,
    };
};

export default getSanatizedConfig(envVars);
