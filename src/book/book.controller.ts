import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { ParsedQs } from 'qs'
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer.options';

@Controller('api/books')
export class BookController {
    constructor(private bookService: BookService) { }

    @Get()
    async getAllBooks(
        @Query() query: ParsedQs
    ): Promise<Book[]> {
        return await this.bookService.getBooks(query)
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', 5, multerOptions))
    async(
        @Body() book: CreateBookDto,
        @UploadedFiles() files: Express.Multer.File[]

    ): Promise<Book> {
        const filePaths = files?.map((file) => file.path)
        const newBook = { ...book, images: filePaths }
        return this.bookService.create(newBook)
    }

    @Get('/:id')
    async findbyId(
        @Param('id') id: string
    ): Promise<Book | null> {
        return await this.bookService.findById(id)
    }

    @Put('/:id')
    async updateBook(
        @Param('id') id: string,
        @Body() book: UpdateBookDto
    ): Promise<Book | null> {
        return await this.bookService.findIdandUpdate(id, book)

    }

    @Delete('/:id')
    async deleteById(
        @Param('id') id: string
    ): Promise<Book | null> {
        return await this.bookService.deleteById(id)
    }
}
