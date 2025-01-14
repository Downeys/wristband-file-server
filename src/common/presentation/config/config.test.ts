import { getSanatizedConfig, RawEnvVars } from './config';

describe('Config tests: tests env variable typescript-santization module', () => {
    it('should successfully return config when all env variables are provided', async () => {
        // Arrange
        const envVars: RawEnvVars = {
            port: '1234',
        };

        // Act
        const config = getSanatizedConfig(envVars);

        // Assert
        expect(`${config.server.port}`).toBe(envVars.port);
    });
    it('should throw an exception when any env variable is missing', async () => {
        // Arrange
        const envVars: RawEnvVars = {
            port: undefined,
        };

        // Act
        // Assert
        expect(() => getSanatizedConfig(envVars)).toThrow('Missing key port in config.env');
    });
});
