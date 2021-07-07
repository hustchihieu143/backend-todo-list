import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// This should be a real class/interface representing a user entity

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repoUser: Repository<User>,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return await this.repoUser.findOne({ email });
  }

  async create(user: any): Promise<User> {
    const email = await this.repoUser.findOne({ email: user.email });
    if (email) {
      throw new Error(`Email ${user.email} already exists`);
    }
    return await this.repoUser.save(user);
  }

  async findByEmail(user: User): Promise<User | undefined> {
    const email = await this.repoUser.findOne({ email: user.email });

    if (email) return user;
    else return undefined;
  }
}
