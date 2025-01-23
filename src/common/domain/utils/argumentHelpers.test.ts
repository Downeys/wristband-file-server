import { guardAgainstNull, guardAgainstNullOrEmpty } from './argumentHelpers';

describe('Argument helpers tests', () => {
    it('should return value if input is not null', () => {
        // Arrange
        const input = 'testInput';

        // Act
        const result = guardAgainstNull(input, 'input');

        // Assert
        expect(result).toBe(input);
    });
    it('should throw exception if input is null', () => {
        // Arrange
        const input = null;

        // Act
        // Assert
        expect(() => guardAgainstNull(input, 'input')).toThrow('input cannot be null or undefined.');
    });
    it('should return value if array input is not null', () => {
        // Arrange
        const input = ['testInput'];

        // Act
        const result = guardAgainstNullOrEmpty(input, 'input');

        // Assert
        expect(result).toBe(input);
    });
    it('should throw exception if input is null', () => {
        // Arrange
        const input = null;

        // Act
        // Assert
        expect(() => guardAgainstNullOrEmpty(input!, 'input')).toThrow('input cannot be null or undefined.');
    });
    it('should throw exception if input is empty', () => {
        // Arrange
        const input: string[] = [];

        // Act
        // Assert
        expect(() => guardAgainstNullOrEmpty(input, 'input')).toThrow('input cannot be empty.');
    });
});
