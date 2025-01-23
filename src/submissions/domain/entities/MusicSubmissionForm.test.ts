import { MusicSubmissionForm } from './MusicSubmissionForm';

describe('MusicSubmissionForm tests', () => {
    it('should return MusicSubmissionForm entity if constructor is provided non-null arguments', () => {
        // Arrange
        // Act
        const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

        // Assert
        expect(entity.band).toBe('testBandName');
        expect(entity.contact).toBe('testContactName');
        expect(entity.email).toBe('test@email.com');
        expect(entity.phone).toBe('111-555-9999');
        expect(entity.attestation).toBe(true);
    });
    it('should throw argument exception if constructor is provided null bandName', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm(null!, 'testContactName', 'test@email.com', '111-555-9999', true)).rejects.toThrow(
            'band cannot be null or undefined.'
        );
    });
    it('should throw argument exception if constructor is provided empty string for bandName', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('', 'testContactName', 'test@email.com', '111-555-9999', true)).rejects.toThrow(
            'band cannot be empty.'
        );
    });
    it('should throw argument exception if constructor is provided null contactName', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', null!, 'test@email.com', '111-555-9999', true)).rejects.toThrow(
            'contact cannot be null or undefined.'
        );
    });
    it('should throw argument exception if constructor is provided empty string for contactName', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', '', 'test@email.com', '111-555-9999', true)).rejects.toThrow(
            'contact cannot be empty.'
        );
    });
    it('should throw argument exception if constructor is provided null email', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', 'testContactName', null!, '111-555-9999', true)).rejects.toThrow(
            'email cannot be null or undefined.'
        );
    });
    it('should throw argument exception if constructor is provided empty string for email', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', 'testContactName', '', '111-555-9999', true)).rejects.toThrow(
            'email cannot be empty.'
        );
    });
    it('should throw argument exception if constructor is provided null phone number', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', null!, true)).rejects.toThrow(
            'phone cannot be null or undefined.'
        );
    });
    it('should throw argument exception if constructor is provided empty string for phone number', () => {
        // Arrange
        // Act
        // Assert
        expect(async () => new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '', true)).rejects.toThrow(
            'phone cannot be empty.'
        );
    });
    it('should return true if isValid is called on valid entity', () => {
        // Arrange
        const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

        // Act
        const result = entity.isValid();

        // Assert
        expect(result).toBe(true);
        expect(entity.validationMessages.length).toBe(0);
    });
    it('should return false and set validation messages if isValid is called on valid entity', () => {
        // Arrange
        const entity = new MusicSubmissionForm('testBandName', '123PeopleNamesCantHaveNumbers123', 'test@email.com', '111-555-9999', true);

        // Act
        const result = entity.isValid();

        // Assert
        expect(result).toBe(false);
        expect(entity.validationMessages.length).toBe(1);
        expect(entity.validationMessages[0]).toBe(
            'Invalid contact name. Names can only include alphabetic letters, spaces, commas, periods, apostrophes, and dashes. Anything else will cause this submission to fail.'
        );
    });
});
