import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = new User();
    user.email = email;
    user.password = password;
    const findUser = await this.authService.validateUser(user);
    // console.log('find user local strategy: ', findUser);
    if (!findUser) {
      throw new Error('no email');
    }
    return findUser;
  }
}
