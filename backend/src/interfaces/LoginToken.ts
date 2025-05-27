import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { LoginInterface } from './Login';

export default class LoginToken {
  public static token: string = '';
  private static secret: string = process.env.SECRET_KEY || 'jwtSecret';

  static createToken(user: LoginInterface): string {
    const { cpf_cnpj, password } = user;
    this.token = jwt.sign({ cpf_cnpj, password }, this.secret);
    
    return this.token;
  }

  static readToken(token: string | undefined) {
    if (!token || token == undefined) throw new UnauthorizedError('Token não econtrado!');
    const decoded = jwt.verify(token, this.secret);
    return decoded;
  }
}