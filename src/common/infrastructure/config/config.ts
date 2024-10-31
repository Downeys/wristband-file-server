import dotenv from 'dotenv';
import { DEFAULT_PORT } from '../../presentation/constants/serverConstants';

dotenv.config();

interface RawEnvVars {
    blobConnectionString: string | undefined;
    photoSubmissionContainer: string | undefined;
    musicSubmissionContainer: string | undefined;
    mp3Container: string | undefined;
    webmContainer: string | undefined;
    photoSubmissionUrl: string | undefined;
    musicSubmissionUrl: string | undefined;
}

interface BlobProps {
    connectionString: string;
    photoSubmissionContainer: string;
    musicSubmissionContainer: string;
    mp3Container: string;
    webmContainer: string;
    photoSubmissionUrl: string;
    musicSubmissionUrl: string;
}

interface Config {
    blob: BlobProps;
}

const envVars: RawEnvVars = {
    blobConnectionString: process.env.BLOB_CONNECTION_STRING,
    photoSubmissionContainer: process.env.PHOTO_SUBMISSION_CONTAINER,
    musicSubmissionContainer: process.env.MUSIC_SUBMISSION_CONTAINER,
    mp3Container: process.env.MP3_CONTAINER,
    webmContainer: process.env.WEBM_CONTAINER,
    photoSubmissionUrl: process.env.PHOTO_SUBMISSION_URL,
    musicSubmissionUrl: process.env.MUSIC_SUBMISSION_URL
}

const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    const blob: BlobProps = {
        connectionString: c.blobConnectionString ?? '',
        photoSubmissionContainer: c.photoSubmissionContainer ?? '',   
        musicSubmissionContainer: c.musicSubmissionContainer ?? '',
        mp3Container: c.mp3Container ?? '',
        webmContainer: c.mp3Container ?? '',
        photoSubmissionUrl: c.photoSubmissionUrl ?? '',
        musicSubmissionUrl: c.musicSubmissionUrl ?? ''
    }

    return {
        blob
    }
}

export default getSanatizedConfig(envVars);
