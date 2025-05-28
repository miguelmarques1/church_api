import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { AuthPayload } from "../dto/auth.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static encryptpass(password: string): string {
    return bcrypt.hashSync(password, 12);
  }
  
  static async comparepassword(hashPassword: string, password: string): Promise<boolean> {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: AuthPayload) {
    return jwt.sign(payload, JWT_SECRET);
  }
}