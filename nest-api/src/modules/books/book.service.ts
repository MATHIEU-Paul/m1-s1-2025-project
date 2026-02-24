import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';
import { BookId } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getBookById(id: BookId): Promise<BookModel | undefined> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: BookId,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.getBookById(id);
    if (!oldBook) {
      return undefined;
    }

    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: BookId): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
