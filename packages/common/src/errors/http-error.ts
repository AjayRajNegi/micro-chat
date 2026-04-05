export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, number>,
  ) {
    super(message);
    this.name = "HttpError";
  }
}
