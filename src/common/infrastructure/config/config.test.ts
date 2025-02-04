import { getSanatizedConfig, RawSecrets } from './config';

const mockSecrets: RawSecrets = {
    BLOB_CONNECTION_STRING: 'test blob connection',
    PHOTO_SUBMISSION_CONTAINER: 'test photo container',
    MUSIC_SUBMISSION_CONTAINER: 'test music container',
    MP3_CONTAINER: 'test mp3 container',
    WEBM_CONTAINER: 'test webm container',
    PHOTO_SUBMISSION_URL: 'test photo url',
    MUSIC_SUBMISSION_URL: 'test music url',
    MONGO_DB_URI: 'test db uri',
};

jest.mock('@azure/identity');
jest.mock('@azure/keyvault-secrets', () => ({
    SecretClient: jest.fn().mockImplementation(() => ({
        listPropertiesOfSecrets: jest
            .fn()
            .mockImplementationOnce(() => [
                { name: 'BLOB_CONNECTION_STRING' },
                { name: 'PHOTO_SUBMISSION_CONTAINER' },
                { name: 'MUSIC_SUBMISSION_CONTAINER' },
                { name: 'MP3_CONTAINER' },
                { name: 'WEBM_CONTAINER' },
                { name: 'PHOTO_SUBMISSION_URL' },
                { name: 'MUSIC_SUBMISSION_URL' },
                { name: 'MONGO_DB_URI' },
            ]),
        getSecret: jest.fn().mockImplementation((secretName: string) => {
            switch (secretName) {
                case 'BLOB_CONNECTION_STRING':
                    return { name: 'BLOB_CONNECTION_STRING', value: mockSecrets.BLOB_CONNECTION_STRING };
                case 'PHOTO_SUBMISSION_CONTAINER':
                    return { name: 'PHOTO_SUBMISSION_CONTAINER', value: mockSecrets.PHOTO_SUBMISSION_CONTAINER };
                case 'MUSIC_SUBMISSION_CONTAINER':
                    return { name: 'MUSIC_SUBMISSION_CONTAINER', value: mockSecrets.MUSIC_SUBMISSION_CONTAINER };
                case 'MP3_CONTAINER':
                    return { name: 'MP3_CONTAINER', value: mockSecrets.MP3_CONTAINER };
                case 'WEBM_CONTAINER':
                    return { name: 'WEBM_CONTAINER', value: mockSecrets.WEBM_CONTAINER };
                case 'PHOTO_SUBMISSION_URL':
                    return { name: 'PHOTO_SUBMISSION_URL', value: mockSecrets.PHOTO_SUBMISSION_URL };
                case 'MUSIC_SUBMISSION_URL':
                    return { name: 'MUSIC_SUBMISSION_URL', value: mockSecrets.MUSIC_SUBMISSION_URL };
                case 'MONGO_DB_URI':
                    return { name: 'MONGO_DB_URI', value: mockSecrets.MONGO_DB_URI };
                default:
                    return { name: 'unknown', value: undefined };
            }
        }),
    })),
}));

describe('Config tests: tests env variable typescript-santization module', () => {
    it('should successfully return config when all env variables are provided', async () => {
        // Arrange
        // Act
        const config = await getSanatizedConfig();

        // Assert
        expect(config.blob.connectionString).toBe(mockSecrets.BLOB_CONNECTION_STRING);
        expect(config.blob.photoSubmissionContainer).toBe(mockSecrets.PHOTO_SUBMISSION_CONTAINER);
        expect(config.blob.musicSubmissionContainer).toBe(mockSecrets.MUSIC_SUBMISSION_CONTAINER);
        expect(config.blob.mp3Container).toBe(mockSecrets.MP3_CONTAINER);
        expect(config.blob.webmContainer).toBe(mockSecrets.WEBM_CONTAINER);
        expect(config.blob.photoSubmissionUrl).toBe(mockSecrets.PHOTO_SUBMISSION_URL);
        expect(config.blob.musicSubmissionUrl).toBe(mockSecrets.MUSIC_SUBMISSION_URL);
        expect(config.mongoDb.uri).toBe(mockSecrets.MONGO_DB_URI);
    });
});
