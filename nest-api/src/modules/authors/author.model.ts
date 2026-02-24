import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  imagePath?: string;
};

export type AuthorBookModel = {
  id: string;
  title: string;
  coverPath?: string;
};

export type AuthorDetailsModel = AuthorModel & {
  books: AuthorBookModel[];
  purchasesAverage: number;
};

export type AuthorWithBookCountModel = AuthorModel & {
  bookCount: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  image?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;