//Extends the built-in Error class to contain statusCode, message and detail,
//Better error handling and api responses
//Could be used as a helper function

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
