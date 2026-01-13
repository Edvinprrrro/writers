export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}
