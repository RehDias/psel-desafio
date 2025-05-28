import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { LoginInterface } from './Login';

export default class LoginToken {
  public static token: string = '';
  private static secret: string = process.env.SECRET_KEY || 'jwtSecret';

  static createToken(user: LoginInterface): string {
    const payload = {
      id: user.id,
      cpf_cnpj: user.cpf_cnpj,
    };

    const token = jwt.sign(payload, this.secret, { expiresIn: '2h' });
    return token;
}
  static readToken(token: string | undefined) {
    if (!token || token == undefined) throw new UnauthorizedError('Token não econtrado!');
    const decoded = jwt.verify(token, this.secret);
    return decoded;
  }
}