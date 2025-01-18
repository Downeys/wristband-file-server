import { getMockFile } from './testHelpers';

jest.mock('sharp', () =>
    jest.fn().mockImplementation(() => ({
        rotate: jest.fn().mockReturnThis(),
        resize: jest.fn().mockReturnThis(),
        webp: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('mockBuffer')),
    }))
);

// I'm not writing any negative test scenarios for this file because it has no async operations
describe('test helpers test', () => {
    it('should return a mock File', () => {
        // Arrange
        const testName = 'testName';
        const testSize = 8192;
        const testType = 'image/png';

        // Act
        const result = getMockFile(testName, testSize, testType);

        // Assert
        expect(result.name).toBe(testName);
        expect(result.size).toBe(testSize);
        expect(result.type).toBe(testType);
    });
});
