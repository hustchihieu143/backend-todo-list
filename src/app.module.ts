import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
  CacheModule,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    TaskModule,
    ProductModule,
    MulterModule.register({
      dest: './uploads',
    }),
    CategoryModule,
    AuthModule,
    UserModule,
    TestModule,

    CacheModule.register({
      ttl: 100, // seconds
      max: 10, // max items
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(RequireSignin)
//       .forRoutes({ path: 'product', method: RequestMethod.POST });
//   }
// }
export class AppModule {}
