import { Injectable } from '@nestjs/common';
import { PurchaseService } from '../purchases/purchase.service';
import {
  BookDetailsModel,
  BookModel,
  BookWithPurchaseCountModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';
import { BookId } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly purchaseService: PurchaseService,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookWithPurchaseCountModel[], number]> {
    const [books, totalCount] = await this.bookRepository.getAllBooks(input);

    const purchaseCountsByBookId =
      await this.purchaseService.getPurchaseCountsByBookIds(
        books.map((book) => book.id),
      );

    const booksWithCount = books.map((book) => ({
      ...book,
      purchaseCount: purchaseCountsByBookId[book.id] ?? 0,
    }));

    return [booksWithCount, totalCount];
  }

  public async getBookById(id: BookId): Promise<BookDetailsModel | undefined> {
    const book = await this.bookRepository.getBookById(id);
    if (!book) {
      return undefined;
    }

    const purchases = await this.purchaseService.getPurchasesByBookId(id);

    return {
      ...book,
      purchases,
    };
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
