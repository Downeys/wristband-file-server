import musicSubmissionRepo from './musicSubmissionRepo';
import getMongoRepo from '../../../common/infrastructure/repo/mongoRepo';
import { MusicSubmission as MusicSubmissionSchema } from '../models/musicSubmission';
import { MusicSubmissionEntity } from '../../domain/entities/MusicSubmissionEntity';
import { MusicSubmissionForm } from '../../domain/entities/MusicSubmissionForm';
import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';

jest.mock('../models/musicSubmission');
jest.mock('../../../common/infrastructure/repo/mongoRepo');

describe('Music submission repo test', () => {
  it('should return submission id if it was successfully persisted', async () => {
    // Arrange
    const mockImageFile = getMockFile('mockImage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const mockSubmissionForm = new MusicSubmissionForm('testBand', 'testContact', 'test@email.com', '111-555-9999', true);
    const mockSubmission = new MusicSubmissionEntity(mockSubmissionForm, [mockImageFile], [mockSongFile]);
    getMongoRepo.connectToDb = jest.fn();

    const mockDbPersist = jest.fn().mockImplementation(() => ({ id: 'mockSubmissionId' }));
    MusicSubmissionSchema.create = mockDbPersist;

    // Act
    const result = await musicSubmissionRepo.persistMusicSubmission(mockSubmission);
    // Assert
    expect(result).toBe('mockSubmissionId');
  });

  it('should throw exception if the db call fails', async () => {
    // Arrange
    const mockImageFile = getMockFile('mockImage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const mockSubmissionForm = new MusicSubmissionForm('testBand', 'testContact', 'test@email.com', '111-555-9999', true);
    const mockSubmission = new MusicSubmissionEntity(mockSubmissionForm, [mockImageFile], [mockSongFile]);
    getMongoRepo.connectToDb = jest.fn();

    const mockDbPersist = jest.fn().mockImplementation(() => {
      throw Error('this is a mock failure');
    });
    MusicSubmissionSchema.create = mockDbPersist;

    // Act
    // Assert
    expect(async () => await musicSubmissionRepo.persistMusicSubmission(mockSubmission)).rejects.toThrow('this is a mock failure');
  });
});
