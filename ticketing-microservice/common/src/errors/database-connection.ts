import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connection to database';
  statusCode = 500;

  constructor() {
    super('Error connection to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializerErrors() {
    return [
      { message: this.reason },
    ];
  }
}