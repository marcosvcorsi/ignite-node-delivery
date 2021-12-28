import bcrypt from "bcrypt";
import { HashProvider } from "../hash";

export class BcryptHashProvider implements HashProvider {
  async generate(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
