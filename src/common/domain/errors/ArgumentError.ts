import { BaseError } from './BaseError';

export class ArgumentError extends BaseError {
    constructor(message: string) {
        super(message, 500, false);
        Object.setPrototypeOf(this, ArgumentError.prototype);
    }
}
export default ArgumentError;
