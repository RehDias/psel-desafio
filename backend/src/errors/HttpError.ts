export default abstract class HttpError extends Error {
  public statusCode: Number;

  constructor(message: String, code: Number) {
    super(message.toString());
    this.statusCode = code;
  }
}