import jwt from "jsonwebtoken";
import { TokenProvider, Params } from "../token";

export class JwtTokenProvider implements TokenProvider {
  constructor(
    private readonly secret: string,
    private readonly expiresIn = "1d"
  ) {}

  async generate({ payload, subject }: Params): Promise<string> {
    return jwt.sign(payload, this.secret, {
      subject,
      expiresIn: this.expiresIn,
    });
  }
}
