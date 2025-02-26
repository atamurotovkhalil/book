import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';  
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import path, { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [BookModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    MongooseModule.forRoot("mongodb+srv://atamurotovkhalil:5d91748086@courseline.lry2a.mongodb.net/?retryWrites=true&w=majority&appName=courseline")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
