import { BookId } from '../books/entities/book.entity';
import { ClientId } from '../clients/client.entity';

export type PurchaseModel = {
  id: string;
  clientId: ClientId;
  bookId: BookId;
  purchaseDate: string;
};

export type ClientPurchaseDetailsModel = {
  id: string;
  bookId: BookId;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage?: string;
  purchaseDate: string;
};

export type BookPurchaseDetailsModel = {
  id: string;
  clientId: ClientId;
  clientFirstName: string;
  clientLastName: string;
  purchaseDate: string;
};

export type CreatePurchaseModel = {
  clientId: ClientId;
  bookId: BookId;
  purchaseDate: string;
};
