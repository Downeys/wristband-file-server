import audioStreamingService from './audioStreamingService';
import blobService from '../../../common/infrastructure/services/blobService';

jest.mock('../../../common/infrastructure/services/blobService');

jest.mock('node:fs', () => ({
    statSync: jest.fn().mockImplementation(() => 1500),
    createReadStream: jest.fn().mockImplementation(() => 'mockStream'),
}));

describe('Audio streaming service test', () => {
    it('should return headers and readstream on successful mp3 call', async () => {
        // Arrange
        const fileName = 'testFileName';
        const rangeHeader = '1500';
        const mockFecthMp3File = jest.fn().mockImplementation(() => ({ filePath: 'testMp3Path' }));
        blobService.blobFetchingService.fetchMp3File = mockFecthMp3File;

        // Act
        const result = await audioStreamingService.streamMp3File(fileName, rangeHeader);

        // Assert
        expect(result.stream).toBe('mockStream');
        expect(Object.entries(result.headers).length).toBe(5);
    });

    it('should throw exception if blobService fails to provide mp3 file path', async () => {
        // Arrange
        const fileName = 'badTestFileName';
        const rangeHeader = '1500';
        const mockFecthMp3File = jest.fn().mockImplementation(() => {
            throw Error('this is a mock failure');
        });
        blobService.blobFetchingService.fetchMp3File = mockFecthMp3File;

        // Act
        // Assert
        expect(async () => await audioStreamingService.streamMp3File(fileName, rangeHeader)).rejects.toThrow('this is a mock failure');
    });

    it('should return headers and readstream on successful webm call', async () => {
        // Arrange
        const fileName = 'testFileName';
        const rangeHeader = '1500';
        const mockFecthWebmFile = jest.fn().mockImplementation(() => ({ filePath: 'testWebmPath' }));
        blobService.blobFetchingService.fetchWebmFile = mockFecthWebmFile;

        // Act
        const result = await audioStreamingService.streamWebmFile(fileName, rangeHeader);

        // Assert
        expect(result.stream).toBe('mockStream');
        expect(Object.entries(result.headers).length).toBe(5);
    });

    it('should throw exception if blobService fails to provide webm file path', async () => {
        // Arrange
        const fileName = 'badTestFileName';
        const rangeHeader = '1500';
        const mockFecthWebmFile = jest.fn().mockImplementation(() => {
            throw Error('this is a mock failure');
        });
        blobService.blobFetchingService.fetchWebmFile = mockFecthWebmFile;

        // Act
        // Assert
        expect(async () => await audioStreamingService.streamWebmFile(fileName, rangeHeader)).rejects.toThrow('this is a mock failure');
    });
});
