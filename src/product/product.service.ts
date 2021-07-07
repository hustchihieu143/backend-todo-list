import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepo.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepo.delete(id);
  }

  create(product: any) {
    // create a new product
    return this.productRepo.save(product);
  }

  async update(id: number, product: Product): Promise<UpdateResult> {
    return await this.productRepo.update(id, product);
  }

  async findByName(name: string): Promise<Product> {
    return await this.productRepo.findOne({ name });
  }
}
