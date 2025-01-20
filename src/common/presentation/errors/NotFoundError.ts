import { BaseError } from '../../domain/error/BaseError';

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
export default NotFoundError;
