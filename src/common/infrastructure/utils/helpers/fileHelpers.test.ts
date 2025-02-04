import { generateBlobName, getFileBuffer } from './fileHelpers';
import { getMockFile } from './testHelpers';

jest.mock('sharp', () =>
    jest.fn().mockImplementation(() => ({
        rotate: jest.fn().mockReturnThis(),
        resize: jest.fn().mockReturnThis(),
        webp: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('mockBuffer')),
    }))
);

describe('fileHelper tests: tests helper methods used by blob service', () => {
    it('should return the photo filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testPhoto.png';
        const mockPhoto = getMockFile(mockFileName, 8192, 'image/png');

        //Act
        const result = generateBlobName(mockPhoto);

        // Assert
        expect(result.includes('testPhoto.png')).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return photo file buffer', async () => {
        // Arrange
        const mockPhoto = getMockFile('testPhoto.png', 8192, 'image/png');

        //Act
        const result = await getFileBuffer(mockPhoto);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(8192);
    });
    it('should return the song filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testSong.mp3';
        const mockSong = getMockFile(mockFileName, 1111, 'audio/mp3');

        //Act
        const result = generateBlobName(mockSong);

        // Assert
        expect(result.includes(mockFileName)).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return song file buffer', async () => {
        // Arrange
        const mockFileName = 'testSong.mp3';
        const mockSong = getMockFile(mockFileName, 1111, 'audio/mp3');

        //Act
        const result = await getFileBuffer(mockSong);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(1111);
    });
    it('should return the video filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testVideo.webm';
        const mockVideo = getMockFile(mockFileName, 1111, 'video/webm');

        //Act
        const result = generateBlobName(mockVideo);

        // Assert
        expect(result.includes(mockFileName)).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return video file buffer', async () => {
        // Arrange
        const mockFileName = 'testVideo.webm';
        const mockVideo = getMockFile(mockFileName, 1111, 'video/webm');

        //Act
        const result = await getFileBuffer(mockVideo);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(1111);
    });
    it('should throw exception if array buffer call fails', async () => {
        // Arrange
        const mockFileName = 'testVideo.webm';
        const mockVideo = getMockFile(mockFileName, 1111, 'video/webm');
        mockVideo.arrayBuffer = jest.fn().mockImplementation(() => {
            throw new Error('this is a mock failure');
        });

        //Act
        // Assert
        expect(async () => await getFileBuffer(mockVideo)).rejects.toThrow('this is a mock failure');
    });
});
