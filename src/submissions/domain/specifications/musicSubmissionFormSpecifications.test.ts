import { MusicSubmissionForm } from '../entities/MusicSubmissionForm';
import { isAttestationChecked, isContactNameValid, isEmailValid, isPhoneValid } from './musicSubmissionFormSpecifications';

describe('Tests for all MusicSubmissionForm specifications', () => {
  it('should return true if provided contact name is valid', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isContactNameValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if contact name has numbers in it', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName2345', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isContactNameValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if contact name has invalid symbols in it', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName!', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isContactNameValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return true if provided email is valid', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided email is missing @ symbol', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'testemail.com', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided email is missing username', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', '@email.com', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided email is missing domain', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@.com', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided email is missing the .com', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided email is missing the period before the .com', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@emailcom', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided email is missing the com after the period', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.', '111-555-9999', true);

    // Act
    const result = isEmailValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return true if provided phone number is valid', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '1115559999', true);

    // Act
    const result = isPhoneValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return true if provided phone number is provided with dashes', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isPhoneValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided phone number is too long', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111555999999', true);

    // Act
    const result = isPhoneValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return false if provided phone number is too short', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111555999', true);

    // Act
    const result = isPhoneValid.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
  it('should return true if provided attestation is true', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', true);

    // Act
    const result = isAttestationChecked.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(true);
  });
  it('should return false if provided attestation is false', () => {
    // Arrange
    const entity = new MusicSubmissionForm('testBandName', 'testContactName', 'test@email.com', '111-555-9999', false);

    // Act
    const result = isAttestationChecked.isSatisfiedBy(entity);

    // Assert
    expect(result).toBe(false);
  });
});
