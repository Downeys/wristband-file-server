import musicSubmissionService from './musicSubmissionService';
import blobService from '../../../common/infrastructure/services/blobService';
import musicSubmissionRepo from '../../infrastructure/repositories/musicSubmissionRepo';
import { MusicSubmissionInput } from '../interfaces/modelInterfaces';
import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';

jest.mock('../../../common/infrastructure/services/blobService');
jest.mock('../../infrastructure/repositories/musicSubmissionRepo');

describe('Music submission service test', () => {
    it('should return submission id if it was successfully persisted', async () => {
        // Arrange
        const mockSubmission: MusicSubmissionInput = {
            band: 'testBand',
            contact: 'testContact',
            email: 'testEmail',
            phone: 'testPhone',
            attestation: true,
        };
        const mockPhoto = getMockFile('mockPhoto', 1111, 'image/png');
        const mockSong = getMockFile('mockSong', 1111, 'audio/mp3');

        const mockFilePersist = jest.fn().mockImplementation(() => 'mockPath');
        blobService.blobSubmissionService.persistPhotoSubmission = mockFilePersist;
        blobService.blobSubmissionService.persistSongSubmission = mockFilePersist;

        const mockDbPersist = jest.fn().mockImplementation(() => 'mockSubmissionId');
        musicSubmissionRepo.persistMusicSubmission = mockDbPersist;

        // Act
        const result = await musicSubmissionService.handleMusicSubmissionUpload(mockSubmission, [mockPhoto], [mockSong]);

        // Assert
        expect(result.submissionId).toBe('mockSubmissionId');
    });

    it('should throw exception if the db call fails', async () => {
        // Arrange
        const mockSubmission: MusicSubmissionInput = {
            band: 'testBand',
            contact: 'testContact',
            email: 'testEmail',
            phone: 'testPhone',
            attestation: true,
        };
        const mockPhoto = getMockFile('mockPhoto', 1111, 'image/png');
        const mockSong = getMockFile('mockSong', 1111, 'audio/mp3');

        const mockFilePersist = jest.fn().mockImplementation(() => 'mockPath');
        blobService.blobSubmissionService.persistPhotoSubmission = mockFilePersist;
        blobService.blobSubmissionService.persistSongSubmission = mockFilePersist;

        const mockDbPersist = jest.fn().mockImplementation(() => {
            throw Error('this is a mock failure');
        });
        musicSubmissionRepo.persistMusicSubmission = mockDbPersist;

        // Act
        // Assert
        expect(async () => await musicSubmissionService.handleMusicSubmissionUpload(mockSubmission, [mockPhoto], [mockSong])).rejects.toThrow(
            'this is a mock failure'
        );
    });
});
