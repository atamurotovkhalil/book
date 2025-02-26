import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose, { ObjectId } from 'mongoose';
import { ParsedQs } from 'qs'
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async getBooks(query: ParsedQs): Promise<Book[]> {
        const resPerPage = 10
        const currentPage = Number(query.page) || 1
        const skip = (currentPage - 1) * resPerPage
        const keyword = query.keyword ? {
            $or: [
                { title: { $regex: query.keyword, $options: 'i' } },
                { author: { $regex: query.keyword, $options: 'i' } }
            ]
        } : {}

        return await this.bookModel.find({ ...keyword }).skip(skip).limit(resPerPage).lean()
    }
    async create(book: CreateBookDto): Promise<Book> {
        return await this.bookModel.create(book)
    }

    async findById(
        _id: string): Promise<Book | null> {
        return await this.bookModel.findById(_id)
    }
    async findIdandUpdate(id: string, book: UpdateBookDto): Promise<Book | null> {
        return this.bookModel.findByIdAndUpdate(id, book)
    }
    async deleteById(id: string): Promise<Book | null> {
        return await this.bookModel.findByIdAndDelete(id)
    }
}
