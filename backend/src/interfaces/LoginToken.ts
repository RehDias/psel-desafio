import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

export default class LoginToken {
  public static token: string = '';
  private static secret: string = process.env.SECRET_KEY || 'jwtSecret';

  static createToken(user: any): string {
    const { email, password } = user;
    this.token = jwt.sign({ email, password }, this.secret);
    return this.token;
  }

  static readToken(token: string | undefined) {
    if (!token || token == undefined) throw new UnauthorizedError('Token não econtrado!');
    const decoded = jwt.verify(token, this.secret);
    return decoded;
  }
}