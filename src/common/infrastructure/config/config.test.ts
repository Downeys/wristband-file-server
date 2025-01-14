import { getSanatizedConfig, RawEnvVars } from './config';

describe('Config tests: tests env variable typescript-santization module', () => {
    it('should successfully return config when all env variables are provided', async () => {
        // Arrange
        const envVars: RawEnvVars = {
            blobConnectionString: 'testBloblConnectionString',
            photoSubmissionContainer: 'testPhotoSubmissionContainer',
            musicSubmissionContainer: 'testMusicSubmissionContainer',
            mp3Container: 'testMp3Container',
            webmContainer: 'testWebmContainer',
            photoSubmissionUrl: 'testPhotoSubmissionUrl',
            musicSubmissionUrl: 'testMusicSubmissionUrl',
            mongoDbUri: 'testMongoDbUri',
        };

        // Act
        const config = getSanatizedConfig(envVars);

        // Assert
        expect(config.blob.connectionString).toBe(envVars.blobConnectionString);
        expect(config.blob.photoSubmissionContainer).toBe(envVars.photoSubmissionContainer);
        expect(config.blob.musicSubmissionContainer).toBe(envVars.musicSubmissionContainer);
        expect(config.blob.mp3Container).toBe(envVars.mp3Container);
        expect(config.blob.webmContainer).toBe(envVars.webmContainer);
        expect(config.blob.photoSubmissionContainer).toBe(envVars.photoSubmissionContainer);
        expect(config.blob.musicSubmissionContainer).toBe(envVars.musicSubmissionContainer);
        expect(config.mongoDb.uri).toBe(envVars.mongoDbUri);
    });
    it('should throw an exception when any env variable is missing', async () => {
        // Arrange
        const envVars: RawEnvVars = {
            blobConnectionString: 'testBloblConnectionString',
            photoSubmissionContainer: 'testPhotoSubmissionContainer',
            musicSubmissionContainer: 'testMusicSubmissionContainer',
            mp3Container: undefined,
            webmContainer: 'testWebmContainer',
            photoSubmissionUrl: 'testPhotoSubmissionUrl',
            musicSubmissionUrl: 'testMusicSubmissionUrl',
            mongoDbUri: 'testMongoDbUri',
        };

        // Act
        // Assert
        expect(() => getSanatizedConfig(envVars)).toThrow('Missing key mp3Container in config.env');
    });
});
