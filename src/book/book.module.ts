import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './schema/book.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    }),
    MongooseModule.forFeature([{
      name: Book.name,
      schema: bookSchema
    }])
  ],
  controllers: [BookController,
  ],
  providers: [BookService]
})
export class BookModule { }
