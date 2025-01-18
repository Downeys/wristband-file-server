import musicSubmissionRepo from './musicSubmissionRepo';
import { MusicSubmission } from '../../application/interfaces/modelInterfaces';
import { MusicSubmission as MusicSubmissionSchema } from '../models/musicSubmission';

jest.mock('../models/musicSubmission');

describe('Music submission repo test', () => {
    it('should return submission id if it was successfully persisted', async () => {
        // Arrange
        const mockSubmission: MusicSubmission = {
            band: 'testBand',
            contact: 'testContact',
            email: 'testEmail',
            phone: 'testPhone',
            attestation: true,
            imageLinks: ['testImageLink'],
            audioLinks: ['testAudioLink'],
        };

        const mockDbPersist = jest.fn().mockImplementation(() => ({ id: 'mockSubmissionId' }));
        MusicSubmissionSchema.create = mockDbPersist;

        // Act
        // Assert
        await expect(musicSubmissionRepo.persistMusicSubmission(mockSubmission)).resolves.toBe('mockSubmissionId');
    });

    it('should throw exception if the db call fails', async () => {
        // Arrange
        const mockSubmission: MusicSubmission = {
            band: 'testBand',
            contact: 'testContact',
            email: 'testEmail',
            phone: 'testPhone',
            attestation: true,
            imageLinks: ['testImageLink'],
            audioLinks: ['testAudioLink'],
        };

        const mockDbPersist = jest.fn().mockImplementation(() => {
            throw Error('this is a mock failure');
        });
        MusicSubmissionSchema.create = mockDbPersist;

        // Act
        // Assert
        expect(async () => await musicSubmissionRepo.persistMusicSubmission(mockSubmission)).rejects.toThrow('this is a mock failure');
    });
});
