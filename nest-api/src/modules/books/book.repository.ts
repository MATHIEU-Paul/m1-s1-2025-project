import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteImage, saveImage } from 'src/utils/image';
import { DataSource, Repository } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookEntity, BookId } from './entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const [books, totalCount] = await this.bookRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      relations: { author: true },
      order: input?.sort,
    });

    return [books, totalCount];
  }

  public async getBookById(id: BookId): Promise<BookModel | undefined> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      return undefined;
    }

    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...book,
      author,
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      throw new Error('Author not found');
    }

    const { coverImage, ...newBook } = book;

    const createdBook = await this.bookRepository.save(
      this.bookRepository.create(newBook),
    );

    if (!coverImage) {
      return {
        ...createdBook,
        author,
      };
    }

    const coverPath = saveImage(coverImage, 'books', createdBook.id);
    await this.bookRepository.update(createdBook.id, { coverPath });

    return {
      ...createdBook,
      author,
      coverPath,
    };
  }

  public async updateBook(
    id: BookId,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.bookRepository.findOne({
      where: { id },
    });

    if (!oldBook) {
      return undefined;
    }

    const { coverImage, ...updates } = book;

    let coverPath: string | undefined = oldBook.coverPath;
    if (coverImage) {
      coverPath = saveImage(coverImage, 'books', oldBook.id);
    }

    await this.bookRepository.update(id, { ...updates, coverPath });

    return this.getBookById(id);
  }

  public async deleteBook(id: BookId): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected && result.affected > 0) {
      deleteImage('books', id);
    }
  }

  public async deleteBooks(ids: BookId[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) => transactionalEntityManager.delete(BookEntity, { id })),
      );
    });

    ids.forEach((id) => deleteImage('books', id));
  }
}
