import { getMockReq, getMockRes } from '@jest-mock/express';
import musicSubmissionController from './musicSubmissionController';
import musicSubmissionService from '../../application/services/musicSubmissionService';
import { MusicSubmissionInput } from '../../application/interfaces/modelInterfaces';
import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';
import { ValidationError } from '../../../common/application/errors/ValidationError';

jest.mock('../../application/services/musicSubmissionService');

describe('music submission endpoints', () => {
    it('should call service layer and return 200 code if submission is successful', async () => {
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
        const req = getMockReq({
            body: mockSubmission,
            files: {
                imageFiles: [mockPhoto],
                audioFiles: [mockSong],
            },
        });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockHandleMusicSubmissionUpload = jest.fn().mockImplementation(() => ({ submissionId: 'mockSubmissionId' }));
        musicSubmissionService.handleMusicSubmissionUpload = mockHandleMusicSubmissionUpload;

        // Act
        await musicSubmissionController.createMusicSubmission(req, res, mockNext);

        // Assert
        expect(mockHandleMusicSubmissionUpload).toHaveBeenCalledWith(mockSubmission, [mockPhoto], [mockSong]);
        expect(res.send).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ result: 'mockSubmissionId' });
    });

    it('should throw exception if no files are included in the submission', async () => {
        // Arrange
        const mockSubmission: MusicSubmissionInput = {
            band: 'testBand',
            contact: 'testContact',
            email: 'testEmail',
            phone: 'testPhone',
            attestation: true,
        };
        const req = getMockReq({
            body: mockSubmission,
        });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockHandleMusicSubmissionUpload = jest.fn().mockImplementation(() => ({ submissionId: 'mockSubmissionId' }));
        musicSubmissionService.handleMusicSubmissionUpload = mockHandleMusicSubmissionUpload;

        // Act
        await musicSubmissionController.createMusicSubmission(req, res, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledWith(new ValidationError('Missing files. Image and song files must be included with the request.'));
    });

    it('should throw exception if submission fails', async () => {
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
        const req = getMockReq({
            body: mockSubmission,
            files: {
                imageFiles: [mockPhoto],
                audioFiles: [mockSong],
            },
        });
        const { res } = getMockRes();
        const mockNext = jest.fn();
        const mockHandleMusicSubmissionUpload = jest.fn().mockImplementation(() => {
            throw new Error('This is a mock failure');
        });
        musicSubmissionService.handleMusicSubmissionUpload = mockHandleMusicSubmissionUpload;

        // Act
        await musicSubmissionController.createMusicSubmission(req, res, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledWith(new Error('This is a mock failure'));
    });
});
