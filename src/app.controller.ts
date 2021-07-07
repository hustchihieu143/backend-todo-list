import {
  Controller,
  Get,
  SetMetadata,
  UseInterceptors,
  Inject,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Post, UseGuards } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('test-cache')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post()
  async setCache(@Body() name: string) {
    await this.cacheManager.set('name', name);
  }

  @Get()
  async getCache(): Promise<string> {
    return await this.cacheManager.get('name');
  }
}
