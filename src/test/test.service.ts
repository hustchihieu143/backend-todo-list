import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TestService {
  constructor(@Inject(REQUEST) private request: Request) {}

  async create() {
    const body = this.request.body;
    console.log('body: ', body);
  }
}
