export class BaseError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 && statusCode >= 400 ? 'fail' : 'error';
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
export default BaseError;
