import { Injectable, OnModuleInit } from '@nestjs/common';
import { DEFAULT_BOOK_GENRES, DEFAULT_BOOK_TYPES } from './book-metadata.data';
import {
  BookTypeModel,
  CreateBookTypeModel,
  CreateGenreModel,
  GenreModel,
} from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookMetadataService implements OnModuleInit {
  constructor(private readonly bookRepository: BookRepository) {}

  public async onModuleInit(): Promise<void> {
    await this.ensureDefaults();
  }

  public async getBookTypes(): Promise<BookTypeModel[]> {
    return this.bookRepository.getBookTypes();
  }

  public async getGenres(): Promise<GenreModel[]> {
    return this.bookRepository.getGenres();
  }

  public async createBookType(
    input: CreateBookTypeModel,
  ): Promise<BookTypeModel> {
    const existing = await this.bookRepository.getBookTypeByName(
      input.name.trim(),
    );
    if (existing) {
      return existing;
    }

    return this.bookRepository.createBookType(input);
  }

  public async createGenre(input: CreateGenreModel): Promise<GenreModel> {
    const existing = await this.bookRepository.getGenreByName(
      input.name.trim(),
    );
    if (existing) {
      return existing;
    }

    return this.bookRepository.createGenre(input);
  }

  private async ensureDefaults(): Promise<void> {
    for (const name of DEFAULT_BOOK_TYPES) {
      await this.createBookType({ name });
    }

    for (const name of DEFAULT_BOOK_GENRES) {
      await this.createGenre({ name });
    }
  }
}
