import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';
import { MusicSubmissionEntity } from '../entities/MusicSubmissionEntity';
import { MusicSubmissionForm } from '../entities/MusicSubmissionForm';
import { isEveryAudioFileNotNull, isEveryImageFileNotNull, isFormValid } from './musicSubmissionEntitySpecifications';

describe('Tests for all MusicSubmissionEntity specifications', () => {
  it('should return true if provided form entity is valid', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

    // Act
    const result = isFormValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided form entity is invalid', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-99999999999999999999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

    // Act
    const result = isFormValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return true if provided image files are not null', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

    // Act
    const result = isEveryImageFileNotNull.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided null image file', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = null;
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile!], [mockSongFile]);

    // Act
    const result = isEveryImageFileNotNull.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return true if provided audio files are not null', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

    // Act
    const result = isEveryAudioFileNotNull.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided null audio file', () => {
    // Arrange
    const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
    const mockSongFile = null;
    const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
    const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile!]);

    // Act
    const result = isEveryAudioFileNotNull.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
});
