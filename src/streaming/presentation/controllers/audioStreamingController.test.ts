import { getMockReq, getMockRes } from '@jest-mock/express';
import audioStreamingController from './audioStreamingController';
import audioStreamingService from '../../application/services/audioStreamingService';

jest.mock('../../application/services/audioStreamingService');

describe('audio streaming endpoints', () => {
    it('should call service layer and return 206 code if mp3 stream call is successful', async () => {
        // Arrange
        const testRangeHeader = '1500';
        const testFileName = 'testFileName';
        const req = getMockReq({ params: { fileName: testFileName }, headers: { range: testRangeHeader } });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockPipe = jest.fn();
        const mockStreamMp3File = jest.fn().mockImplementation(() => ({ stream: { pipe: mockPipe }, headers: 'mockHeaders' }));
        audioStreamingService.streamMp3File = mockStreamMp3File;

        // Act
        await audioStreamingController.getMp3AudioStream(req, res, mockNext);

        // Assert
        expect(mockStreamMp3File).toHaveBeenCalledWith(testFileName, testRangeHeader);
        expect(res.writeHead).toHaveBeenCalledWith(206, 'mockHeaders');
        expect(mockPipe).toHaveBeenCalledWith(res);
    });

    it('should throw exception if mp3 stream call fails', async () => {
        // Arrange
        const testRangeHeader = '1500';
        const testFileName = 'testFileName';
        const req = getMockReq({ params: { fileName: testFileName }, headers: { range: testRangeHeader } });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockStreamMp3File = jest.fn().mockImplementation(() => {
            throw new Error('This is a mock failure');
        });
        audioStreamingService.streamMp3File = mockStreamMp3File;

        // Act
        // Assert
        expect(async () => await audioStreamingController.getMp3AudioStream(req, res, mockNext)).rejects.toThrow('This is a mock failure');
    });

    it('should call service layer and return 206 code if webm stream call is successful', async () => {
        // Arrange
        const testRangeHeader = '1500';
        const testFileName = 'testFileName';
        const req = getMockReq({ params: { fileName: testFileName }, headers: { range: testRangeHeader } });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockPipe = jest.fn();
        const mockStreamWebmFile = jest.fn().mockImplementation(() => ({ stream: { pipe: mockPipe }, headers: 'mockHeaders' }));
        audioStreamingService.streamWebmFile = mockStreamWebmFile;

        // Act
        await audioStreamingController.getWebmAudioStream(req, res, mockNext);

        // Assert
        expect(mockStreamWebmFile).toHaveBeenCalledWith(testFileName, testRangeHeader);
        expect(res.writeHead).toHaveBeenCalledWith(206, 'mockHeaders');
        expect(mockPipe).toHaveBeenCalledWith(res);
    });

    it('should throw exception if webm stream call fails', async () => {
        // Arrange
        const testRangeHeader = '1500';
        const testFileName = 'testFileName';
        const req = getMockReq({ params: { fileName: testFileName }, headers: { range: testRangeHeader } });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockStreamWebmFile = jest.fn().mockImplementation(() => {
            throw new Error('This is a mock failure');
        });
        audioStreamingService.streamWebmFile = mockStreamWebmFile;

        // Act
        // Assert
        expect(async () => await audioStreamingController.getMp3AudioStream(req, res, mockNext)).rejects.toThrow('This is a mock failure');
    });
});
