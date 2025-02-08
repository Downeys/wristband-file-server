import { BaseError } from '../../domain/errors/BaseError';

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
export default ValidationError;
