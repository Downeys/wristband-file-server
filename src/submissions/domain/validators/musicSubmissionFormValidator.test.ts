import { MusicSubmissionForm } from '../entities/MusicSubmissionForm';
import musicSubmissionFormValidator from './musicSubmissionFormValidator';

describe('Tests for all MusicSubmissionEntity specifications', () => {
    it('should return true if provided form entity is valid', () => {
        // Arrange
        const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

        // Act
        const result = musicSubmissionFormValidator.isValid(entity);

        // Assert
        expect(result.isValid).toBe(true);
        expect(result.validationMessages.length).toBe(0);
    });
    it('should return false with validation messages if provided form entity is invalid', () => {
        // Arrange
        const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', false);

        // Act
        const result = musicSubmissionFormValidator.isValid(entity);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.validationMessages.length).toBe(1);
        expect(result.validationMessages[0]).toBe('Missing ownership attestation. Please attest to the ownership of the submission.');
    });
});
