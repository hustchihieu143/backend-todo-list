import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Session,
  Req,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../user/user.entity';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
    @Session() session: Record<string, any>,
  ) {
    response.cookie(
      'user',
      (await this.authService.login(req.user)).access_token,
    );

    //req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('cookie: ', req.cookies.user);
    req.session.visits = (await req.session.visits)
      ? req.session.visits + 1
      : 1;
    console.log(req.session.visits);
    return req.user;
  }

  @Post('auth/register')
  register(@Body() user: User) {
    return this.authService.register(user);
  }
}
