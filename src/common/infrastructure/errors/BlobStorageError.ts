import { BaseError } from '../../domain/errors/BaseError';

export class BlobStorageError extends BaseError {
  constructor(message: string) {
    super(message, 500, false);
    Object.setPrototypeOf(this, BlobStorageError.prototype);
  }
}
export default BlobStorageError;
