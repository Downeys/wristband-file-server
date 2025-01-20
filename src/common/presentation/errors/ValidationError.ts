import { BaseError } from '../../domain/error/BaseError';

export class ValidationError extends BaseError {
    errorData: Record<string, string>[];
    constructor(data: Record<string, string>[]) {
        super('Validation Error', 400);
        this.errorData = data;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
export default ValidationError;
