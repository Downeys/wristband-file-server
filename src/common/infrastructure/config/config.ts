import dotenv from 'dotenv';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

dotenv.config();

export interface RawSecrets {
  BLOB_CONNECTION_STRING: string | undefined;
  PHOTO_SUBMISSION_CONTAINER: string | undefined;
  MUSIC_SUBMISSION_CONTAINER: string | undefined;
  MP3_CONTAINER: string | undefined;
  WEBM_CONTAINER: string | undefined;
  PHOTO_SUBMISSION_URL: string | undefined;
  MUSIC_SUBMISSION_URL: string | undefined;
  MONGO_DB_URI: string | undefined;
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

interface MongoDbProps {
  uri: string;
}

interface Config {
  blob: BlobProps;
  mongoDb: MongoDbProps;
}

const getSecrets = async (): Promise<RawSecrets> => {
  const credential = new DefaultAzureCredential();

  const vaultName = process.env.KEY_VAULT_NAME;
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);

  const secrets: Record<string, string | undefined> = {};

  for await (let secretProperties of client.listPropertiesOfSecrets()) {
    const secret = await client.getSecret(secretProperties.name);
    if (!secret.value) throw new Error(`Missing value for ${secretProperties.name} in config.env`);
    secrets[secret.name.replaceAll('-', '_')] = secret.value;
  }
  return secrets as unknown as RawSecrets;
};

export const getSanatizedConfig = async (): Promise<Config> => {
  const secrets = await getSecrets();

  for (const [key, value] of Object.entries(secrets)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  const blob: BlobProps = {
    connectionString: secrets.BLOB_CONNECTION_STRING!,
    photoSubmissionContainer: secrets.PHOTO_SUBMISSION_CONTAINER!,
    musicSubmissionContainer: secrets.MUSIC_SUBMISSION_CONTAINER!,
    mp3Container: secrets.MP3_CONTAINER!,
    webmContainer: secrets.WEBM_CONTAINER!,
    photoSubmissionUrl: secrets.PHOTO_SUBMISSION_URL!,
    musicSubmissionUrl: secrets.MUSIC_SUBMISSION_URL!,
  };

  const mongoDb: MongoDbProps = {
    uri: secrets.MONGO_DB_URI!,
  };

  return {
    blob,
    mongoDb,
  };
};

export default getSanatizedConfig();
