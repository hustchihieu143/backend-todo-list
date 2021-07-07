import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find();
  }

  //   async findOne(id: number): Promise<Product> {
  //     return await this.productRepo.findOne(id);
  //   }

  //   async delete(id: number): Promise<DeleteResult> {
  //     return await this.productRepo.delete(id);
  //   }

  create(category: any) {
    // create a new product
    return this.categoryRepo.save(category);
  }

  //   async update(product: Product): Promise<UpdateResult> {
  //     return await this.productRepo.update(product.id, product);
  //   }

  //   async findByName(name: string): Promise<Product> {
  //     return await this.productRepo.findOne({ name });
  //   }
}
