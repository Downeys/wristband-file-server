import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';
import { MusicSubmissionEntity } from '../entities/MusicSubmissionEntity';
import { MusicSubmissionForm } from '../entities/MusicSubmissionForm';
import musicSubmissionEntityValidator from './musicSubmissionEntityValidator';

describe('Tests for all MusicSubmissionEntity specifications', () => {
  it('should return true if provided form entity is valid', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

    // Act
    const result = musicSubmissionEntityValidator.isValid(entity);

    // Assert
    expect(result.isValid).toBe(true);
    expect(result.validationMessages.length).toBe(0);
  });
  it('should return true if provided form entity is valid', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = null;
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile!]);

    // Act
    const result = musicSubmissionEntityValidator.isValid(entity);

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.validationMessages.length).toBe(1);
    expect(result.validationMessages[0]).toBe('Missing song file. Please provide at least one song file with your submission.');
  });
});
