import { BaseError } from '../../domain/errors/BaseError';

export class DataAccessError extends BaseError {
  constructor(message: string) {
    super(message, 500, false);
    Object.setPrototypeOf(this, DataAccessError.prototype);
  }
}
export default DataAccessError;
