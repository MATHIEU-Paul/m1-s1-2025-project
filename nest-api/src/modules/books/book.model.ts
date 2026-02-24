import { AuthorId } from '../authors/author.entity';
import { AuthorModel } from '../authors/author.model';
import { BookPurchaseDetailsModel } from '../purchases/purchase.model';
import { BookId } from './entities/book.entity';

export type BookModel = {
  id: BookId;
  title: string;
  author: AuthorModel;
  yearPublished: number;
  coverPath?: string;
};

export type BookDetailsModel = BookModel & {
  purchases: BookPurchaseDetailsModel[];
};

export type BookWithPurchaseCountModel = BookModel & {
  purchaseCount: number;
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
  coverImage?: string;
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookWithPurchaseCountModel[];
};
