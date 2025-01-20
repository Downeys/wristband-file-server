import path from 'node:path';
import { ASSETS_PATH } from '../constants/blobConstants';
import { blobFetchingService, blobSubmissionService } from './blobService';
import config from '../config/config';

const mockDownloadToFile = jest.fn().mockImplementation((savePath: string) => {
    const validSavePath1 = path.join(ASSETS_PATH, 'validFileName.mp3');
    const validSavePath2 = path.join(ASSETS_PATH, 'validFileName.webm');
    if (savePath === validSavePath1 || savePath === validSavePath2) return 'testSavePath';
    return null;
});

const mockUpload = jest.fn().mockImplementation((buffer, byteLength) => {
    if (buffer.mockFail) return null;
    return { requestId: 'testRequestId' };
});

jest.mock('@azure/storage-blob', () => ({
    BlobServiceClient: {
        fromConnectionString: (connectionString: string) => ({
            getContainerClient: (container: string) => ({
                getBlockBlobClient: (fileName: string) => ({
                    downloadToFile: mockDownloadToFile,
                    upload: mockUpload,
                }),
            }),
        }),
    },
}));

jest.mock('node:fs', () => ({
    existsSync: (savePath: string) => {
        const alreadyExistsPath1 = path.join(ASSETS_PATH, 'fileAlreadyExists.mp3');
        const alreadyExistsPath2 = path.join(ASSETS_PATH, 'fileAlreadyExists.webm');
        return savePath === alreadyExistsPath1 || savePath === alreadyExistsPath2;
    },
}));

jest.mock('../utils/helpers/fileHelpers', () => ({
    generateBlobName: (file: File) => 'testFileName',
    getFileBuffer: (file: File) => {
        if (file.name === 'fileShouldFail') return { byteLength: 1111, mockFail: true };
        return { byteLength: 1111 };
    },
}));

describe('blobService tests: tests infra module used to fetch or store blobs', () => {
    describe('blobFetchingService tests: tests methods used to fetch blobs', () => {
        it('should fetch mp3 if the file does not already exist in local storage', async () => {
            // Arrange
            const testInput = 'validFileName';
            const expectedOutput = { filePath: path.join(ASSETS_PATH, 'validFileName.mp3') };

            // Act
            const result = await blobFetchingService.fetchMp3File(testInput);

            // Assert
            expect(result.filePath).toBe(expectedOutput.filePath);
            expect(mockDownloadToFile).toHaveBeenCalledWith(expectedOutput.filePath);
        });
        it('should not fetch mp3 if file does already exist in local storage', async () => {
            // Arrange
            const testInput = 'fileAlreadyExists';
            const expectedOutput = { filePath: path.join(ASSETS_PATH, 'fileAlreadyExists.mp3') };

            // Act
            const result = await blobFetchingService.fetchMp3File(testInput);

            // Assert
            expect(result.filePath).toBe(expectedOutput.filePath);
            expect(mockDownloadToFile).not.toHaveBeenCalled();
        });
        it('should throw exception if there the mp3 fails to download from the external server', async () => {
            // Arrange
            const testInput = 'invalidFileName';

            // Act
            // Assert
            expect(async () => await blobFetchingService.fetchMp3File(testInput)).rejects.toThrow('Internal Server Error');
        });
        it('should fetch webm if the file does not already exist in local storage', async () => {
            // Arrange
            const testInput = 'validFileName';
            const expectedOutput = { filePath: path.join(ASSETS_PATH, 'validFileName.webm') };

            // Act
            const result = await blobFetchingService.fetchWebmFile(testInput);

            // Assert
            expect(result.filePath).toBe(expectedOutput.filePath);
            expect(mockDownloadToFile).toHaveBeenCalledWith(expectedOutput.filePath);
        });
        it('should not fetch webm if file does already exist in local storage', async () => {
            // Arrange
            const testInput = 'fileAlreadyExists';
            const expectedOutput = { filePath: path.join(ASSETS_PATH, 'fileAlreadyExists.webm') };

            // Act
            const result = await blobFetchingService.fetchWebmFile(testInput);

            // Assert
            expect(result.filePath).toBe(expectedOutput.filePath);
            expect(mockDownloadToFile).not.toHaveBeenCalled();
        });
        it('should throw exception if there the webm fails to download from the external server', async () => {
            // Arrange
            const testInput = 'invalidFileName';

            // Act
            // Assert
            expect(async () => await blobFetchingService.fetchWebmFile(testInput)).rejects.toThrow('Internal Server Error');
        });
    });
    describe('blobSubmissionService tests: tests methods used to store blobs', () => {
        it('should return storage url if photo upload is successful', async () => {
            // Arrange
            const testInput = { name: 'testFileName', arrayBuffer: jest.fn() } as unknown as File;
            const expectedOutput = { fileUrl: config.blob.photoSubmissionUrl + 'testFileName' };

            // Act
            const result = await blobSubmissionService.persistPhotoSubmission(testInput);

            // Assert
            expect(result.fileUrl).toBe(expectedOutput.fileUrl);
        });
        it('should throw exception if photo upload fails', async () => {
            // Arrange
            const testInput = { name: 'fileShouldFail', arrayBuffer: jest.fn() } as unknown as File;

            // Act
            // Assert
            expect(async () => await blobSubmissionService.persistPhotoSubmission(testInput)).rejects.toThrow('Internal Server Error');
        });
        it('should return storage url if song upload is successful', async () => {
            // Arrange
            const testInput = { name: 'testFileName', arrayBuffer: jest.fn() } as unknown as File;
            const expectedOutput = { fileUrl: config.blob.musicSubmissionUrl + 'testFileName' };

            // Act
            const result = await blobSubmissionService.persistSongSubmission(testInput);

            // Assert
            expect(result.fileUrl).toBe(expectedOutput.fileUrl);
        });
        it('should throw exception if song upload fails', async () => {
            // Arrange
            const testInput = { name: 'fileShouldFail', arrayBuffer: jest.fn() } as unknown as File;

            // Act
            // Assert
            expect(async () => await blobSubmissionService.persistSongSubmission(testInput)).rejects.toThrow('Internal Server Error');
        });
    });
});
