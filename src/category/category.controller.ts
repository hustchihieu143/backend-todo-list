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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
    const category = {
      name: req.body.name,
      categoryParent: req.body.categoryParent,
      image: filename,
    };
    return this.categoryService.create(category);
  }

  @Get('public/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'files' });
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
