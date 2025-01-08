import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

export default class LoginToken {
  public static token: string = '';
  private static secret: string = process.env.SECRET_KEY || 'jwtSecret';

  static createToken(email: string | undefined, password: string | undefined): string {
    this.token = jwt.sign({ email, password }, this.secret);
    return this.token;
  }

  static readToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (err) {
      if (!token || token == undefined) throw new UnauthorizedError('Token não econtrado!');
      throw new UnauthorizedError('Token inválido ou expirado!');
    }
  }
}