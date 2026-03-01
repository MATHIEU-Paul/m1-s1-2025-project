import { Injectable } from '@nestjs/common';
import { AuthorId } from './author.entity';
import {
  AuthorDetailsModel,
  AuthorModel,
  AuthorWithBookCountModel,
  CreateAuthorModel,
  FilterAuthorsModel,
  UpdateAuthorModel,
} from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(
    params?: FilterAuthorsModel,
  ): Promise<[AuthorWithBookCountModel[], number]> {
    return this.authorRepository.getAllAuthors(params);
  }

  public async getAuthorById(
    id: AuthorId,
  ): Promise<AuthorDetailsModel | undefined> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(
    id: AuthorId,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    const oldAuthor = await this.getAuthorById(id);
    if (!oldAuthor) {
      return undefined;
    }

    return this.authorRepository.updateAuthor(id, author);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
