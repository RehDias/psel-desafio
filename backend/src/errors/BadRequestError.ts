import HttpError from "./HttpError";

export default class BadRequestError extends HttpError {
  constructor(message: String) {
    super(message, 400);
  }
};
