import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: User): Promise<any> {
    // const user = await this.userService.findOne(email);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
    // console.log('validate user auth service: ', user);
    const findUser = await this.userService.findOne(user.email);

    // console.log('findUser: ', findUser);
    if (findUser === undefined) {
      throw new Error(`email ${user.email} not found`);
    } else {
      const isMatch = await bcrypt.compare(user.password, findUser.password);
      if (!isMatch) {
        throw new Error(`Password is not match`);
      }
    }
    const { password, ...result } = findUser;
    return result;
  }

  async login(user: any) {
    // console.log('user auth service: ', user);
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const hashPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User();
    newUser.email = user.email;
    newUser.password = hashPassword;
    newUser.username = user.username;
    newUser.role = user.role;

    return await this.userService.create(newUser);
  }
}
