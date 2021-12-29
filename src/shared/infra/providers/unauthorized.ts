import { ServerError } from "../../errors/server";

export class UnauthorizedError extends ServerError {
  constructor(message: string) {
    super(message, 401);

    this.name = "UnauthorizedError";
  }
}
