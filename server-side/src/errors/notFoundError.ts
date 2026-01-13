import { HttpError } from "./httpError";

export class NotFoundError extends HttpError {
  constructor() {
    super(404, "Not found");
  }
}
