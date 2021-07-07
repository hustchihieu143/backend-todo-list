import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parentCategory: number;

  @OneToMany('Product', (product: Product) => product.category)
  products: Product[];

  @Column()
  image: string;
}
