import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity, AuthorId } from './author.entity';
import {
  AuthorModel,
  AuthorWithBookCountModel,
  AuthorWithBooksModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from './author.model';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorWithBookCountModel[]> {
    // Optimized query to get authors with book count without loading all books
    const authors = await this.authorRepository
      .createQueryBuilder('author')
      .select(['author.id', 'author.firstName', 'author.lastName', 'author.imagePath'])
      .loadRelationCountAndMap('author.bookCount', 'author.books')
      .getMany();

    return authors.map((author) => ({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      imagePath: author.imagePath,
      bookCount: author.bookCount ?? 0,
    }));
  }

  public async getAuthorById(
    id: AuthorId,
  ): Promise<AuthorWithBooksModel | undefined> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        imagePath: true,
        books: {
          id: true,
          title: true,
          coverPath: true,
        },
      },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...author,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async updateAuthor(
    id: AuthorId,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    await this.authorRepository.update(id, author);
    return this.getAuthorById(id);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
