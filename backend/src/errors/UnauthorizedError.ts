import HttpError from "./HttpError";

export default class UnauthorizedError extends HttpError {
  constructor(message: String) {
    super(message, 401);
  }
};