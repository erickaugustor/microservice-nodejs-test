import { CustomError } from './custom-error';

export class BadResquestError extends CustomError {
  statusCode = 400;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, BadResquestError.prototype);
	}

	serializerErrors() {
		return [{ message: this.message }];
	}
}
