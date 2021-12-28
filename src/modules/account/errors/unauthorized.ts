import { ServerError } from "../../../shared/errors/server";

export class UnauthorizedError extends ServerError {
  constructor() {
    super("Username or password invalid!", 401);

    this.name = "UnauthorizedError";
  }
}
