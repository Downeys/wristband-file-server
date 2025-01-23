import { getMockFile } from '../../../common/infrastructure/utils/helpers/testHelpers';
import { MusicSubmissionEntity } from './MusicSubmissionEntity';
import { MusicSubmissionForm } from './MusicSubmissionForm';

describe('MusicSubmissionEntity tests', () => {
    it('should return an entity if constructor is provided non-null arguments', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        // Act
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        // Assert
        expect(entity.form.band).toBe('testBandName');
        expect(entity.form.contact).toBe('testContactName');
        expect(entity.form.email).toBe('test@email.com');
        expect(entity.form.phone).toBe('111-555-9999');
        expect(entity.form.attestation).toBe(true);
        expect(entity.imageFiles.length).toBe(1);
        expect(entity.audioFiles.length).toBe(1);
    });

    it('should throw an argument exception if constructor is provided null form', () => {
        // Arrange
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        // Act
        // Assert
        expect(async () => new MusicSubmissionEntity(null!, [mockImageFile], [mockSongFile])).rejects.toThrow('form cannot be null or undefined.');
    });

    it('should throw an argument exception if constructor is provided null imageFiles argument', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        // Act
        // Assert
        expect(async () => new MusicSubmissionEntity(formEntity, null!, [mockSongFile])).rejects.toThrow('imageFiles cannot be null or undefined.');
    });

    it('should throw an argument exception if constructor is provided empty array for imageFiles', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        // Act
        // Assert
        expect(async () => new MusicSubmissionEntity(formEntity, [], [mockSongFile])).rejects.toThrow('imageFiles cannot be empty.');
    });

    it('should throw an argument exception if constructor is provided null audioFiles argument', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        // Act
        // Assert
        expect(async () => new MusicSubmissionEntity(formEntity, [mockImageFile], null!)).rejects.toThrow('audioFiles cannot be null or undefined.');
    });

    it('should throw an argument exception if constructor is provided empty array for audioFiles', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        // Act
        // Assert
        expect(async () => new MusicSubmissionEntity(formEntity, [mockImageFile], [])).rejects.toThrow('audioFiles cannot be empty.');
    });

    it('should return true from isValid if an entity is valid', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

        // Act
        const result = entity.isValid();
        // Assert
        expect(result).toBe(true);
        expect(entity.validationMessages.length).toBe(0);
    });

    it('should return false from isValid if an entity is not valid', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);

        // Act
        const result = entity.isValid();
        // Assert
        expect(result).toBe(false);
        expect(entity.validationMessages.length).toBe(2);
        expect(entity.validationMessages[0]).toBe('There is an issue with the form.');
        expect(entity.validationMessages[1]).toBe('Invalid email. Please ensure the email is accurate and formed properly.');
    });

    it('should update the image Urls when setImageUrls is called with non-null value', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls = ['mockUrl1', 'mockUrl2'];

        // Act
        entity.setImageUrls(mockUrls);
        // Assert
        expect(entity.imageUrls.length).toBe(2);
        expect(entity.imageUrls[0]).toBe('mockUrl1');
        expect(entity.imageUrls[1]).toBe('mockUrl2');
    });

    it('should throw argument exception when setImageUrls is called with null value', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls = null;

        // Act
        // Assert
        expect(async () => entity.setImageUrls(mockUrls!)).rejects.toThrow('urls cannot be null or undefined.');
    });

    it('should throw argument exception when setImageUrls is called with empty array', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls: string[] = [];

        // Act
        // Assert
        expect(async () => entity.setImageUrls(mockUrls)).rejects.toThrow('urls cannot be empty.');
    });

    it('should update the audio Urls when setAudioUrls is called with non-null value', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls = ['mockUrl1', 'mockUrl2'];

        // Act
        entity.setAudioUrls(mockUrls);
        // Assert
        expect(entity.audioUrls.length).toBe(2);
        expect(entity.audioUrls[0]).toBe('mockUrl1');
        expect(entity.audioUrls[1]).toBe('mockUrl2');
    });

    it('should throw argument exception when setImageUrls is called with null value', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls = null;

        // Act
        // Assert
        expect(async () => entity.setAudioUrls(mockUrls!)).rejects.toThrow('urls cannot be null or undefined.');
    });

    it('should throw argument exception when setImageUrls is called with empty array', () => {
        // Arrange
        const formEntity = new MusicSubmissionForm('testBandName', 'testContactName', 'invalidemail', '111-555-9999', true);
        const mockImageFile = getMockFile('mockimage.png', 1111, 'image/png');
        const mockSongFile = getMockFile('mockSong.mp3', 1111, 'audio/mp3');
        const entity = new MusicSubmissionEntity(formEntity, [mockImageFile], [mockSongFile]);
        const mockUrls: string[] = [];

        // Act
        // Assert
        expect(async () => entity.setAudioUrls(mockUrls)).rejects.toThrow('urls cannot be empty.');
    });
});
