import { BookId } from '../books/entities/book.entity';
import { ClientId } from '../clients/client.entity';

export type PurchaseModel = {
  id: string;
  clientId: ClientId;
  bookId: BookId;
  purchaseDate: string;
};

export type CreatePurchaseModel = {
  clientId: ClientId;
  bookId: BookId;
  purchaseDate: string;
};
