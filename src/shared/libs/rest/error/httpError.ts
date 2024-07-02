export class HttpError extends Error {
  public httpStatusCode: string;
  public message: string;

  constructor(httpStatusCode: string, message: string) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.message = message;
  }
}
