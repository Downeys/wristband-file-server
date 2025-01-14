import { generateBlobName, getFileBuffer } from './fileHelpers';

const getMockFile = (name: string, size: number, type: string) => {
    const blob = new Blob(['a'.repeat(size)], { type });
    return new File([blob], name);
};

describe('fileHelper tests: tests helper methods used by blob service', () => {
    it('should return the photo filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testPhoto.png';
        const mockPhoto = getMockFile('testPhoto.png', 1111, 'image/png');

        //Act
        const result = generateBlobName(mockPhoto);

        // Assert
        expect(result.includes('testPhoto.png')).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return photo file buffer', async () => {
        // Arrange
        const mockFileName = 'testPhoto.png';
        const mockPhoto: File = getMockFile('testPhoto.png', 1111, 'image/png');
        const t = mockPhoto.type;
        //Act
        const result = await getFileBuffer(mockPhoto);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(1111);
    });
    it('should return the song filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testSong.mp3';
        const mockPhoto = getMockFile(mockFileName, 1111, 'audio/mp3');

        //Act
        const result = generateBlobName(mockPhoto);

        // Assert
        expect(result.includes(mockFileName)).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return song file buffer', async () => {
        // Arrange
        const mockFileName = 'testSong.mp3';
        const mockPhoto = getMockFile(mockFileName, 1111, 'audio/mp3');

        //Act
        const result = await getFileBuffer(mockPhoto);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(1111);
    });
    it('should return the video filename with a uuid tacked onto the front of it', () => {
        // Arrange
        const mockFileName = 'testVideo.webm';
        const mockPhoto = getMockFile(mockFileName, 1111, 'video/webm');

        //Act
        const result = generateBlobName(mockPhoto);

        // Assert
        expect(result.includes(mockFileName)).toBeTruthy();
        // 36 refers to the length of the uuid tacked onto the front of the filename
        expect(result.length).toBe(mockFileName.length + 36);
    });
    it('should return video file buffer', async () => {
        // Arrange
        const mockFileName = 'testVideo.webm';
        const mockPhoto = getMockFile(mockFileName, 1111, 'video/webm');

        //Act
        const result = await getFileBuffer(mockPhoto);

        // Assert
        expect(result).toBeTruthy();
        expect(result.buffer.byteLength).toBe(1111);
    });
});
