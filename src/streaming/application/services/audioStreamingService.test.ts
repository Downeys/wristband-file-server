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
    const songId = 'testSongId';
    const rangeHeader = '1500';
    const mockFetchMp3File = jest.fn().mockImplementation(() => ({ filePath: 'testMp3Path' }));
    blobService.blobFetchingService.fetchMp3File = mockFetchMp3File;

    // Act
    const result = await audioStreamingService.streamMp3File(songId, rangeHeader);

    // Assert
    expect(result.stream).toBe('mockStream');
    expect(Object.entries(result.headers).length).toBe(5);
  });

  it('should throw exception if blobService fails to provide mp3 file path', async () => {
    // Arrange
    const songId = 'badTestSongId';
    const rangeHeader = '1500';
    const mockFetchMp3File = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchMp3File = mockFetchMp3File;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamMp3File(songId, rangeHeader)).rejects.toThrow('this is a mock failure');
  });

  it('should throw exception if songId input is null', async () => {
    // Arrange
    const songId = null;
    const rangeHeader = '1500';
    const mockFetchMp3File = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchMp3File = mockFetchMp3File;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamMp3File(songId!, rangeHeader)).rejects.toThrow('songId cannot be null or undefined.');
  });

  it('should throw exception if songId input is an empty string', async () => {
    // Arrange
    const songId = '';
    const rangeHeader = '1500';
    const mockFetchMp3File = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchMp3File = mockFetchMp3File;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamMp3File(songId, rangeHeader)).rejects.toThrow('songId cannot be empty.');
  });

  it('should return headers and readstream on successful webm call', async () => {
    // Arrange
    const songId = 'testSongId';
    const rangeHeader = '1500';
    const mockFetchWebmFile = jest.fn().mockImplementation(() => ({ filePath: 'testWebmPath' }));
    blobService.blobFetchingService.fetchWebmFile = mockFetchWebmFile;

    // Act
    const result = await audioStreamingService.streamWebmFile(songId, rangeHeader);

    // Assert
    expect(result.stream).toBe('mockStream');
    expect(Object.entries(result.headers).length).toBe(5);
  });

  it('should throw exception if blobService fails to provide webm file path', async () => {
    // Arrange
    const songId = 'badTestSongId';
    const rangeHeader = '1500';
    const mockFetchWebmFile = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchWebmFile = mockFetchWebmFile;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamWebmFile(songId, rangeHeader)).rejects.toThrow('this is a mock failure');
  });

  it('should throw exception if file name input is null', async () => {
    // Arrange
    const songId = null;
    const rangeHeader = '1500';
    const mockFetchWebmFile = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchWebmFile = mockFetchWebmFile;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamWebmFile(songId!, rangeHeader)).rejects.toThrow('songId cannot be null or undefined.');
  });

  it('should throw exception if file name input is an empty string', async () => {
    // Arrange
    const songId = '';
    const rangeHeader = '1500';
    const mockFetchWebmFile = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    blobService.blobFetchingService.fetchWebmFile = mockFetchWebmFile;

    // Act
    // Assert
    expect(async () => await audioStreamingService.streamWebmFile(songId, rangeHeader)).rejects.toThrow('songId cannot be empty.');
  });
});
