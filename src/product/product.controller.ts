import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Request,
  Res,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(@UploadedFile() file, @Request() req) {
    const filename = req.file.filename;

    const product = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      image: filename,
    };
    return this.productService.create(product);
  }
  @Get('public/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'files' });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(@UploadedFile() file, @Param('id') id: number, @Request() req) {
    const filename = req.file.filename;
    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.description = req.body.description;
    product.category = req.body.category;
    product.image = filename;
    return this.productService.update(id, product);
  }

  @Get('searchByName/:name')
  getProductByName(@Param('name') name: string) {
    console.log(name);
    return this.productService.findByName(name);
  }
}
