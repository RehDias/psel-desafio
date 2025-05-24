export default abstract class HttpError extends Error {
  public statusCode: Number;

  constructor(message: string, code: Number) {
    super(message);
    this.statusCode = code;
  }
}