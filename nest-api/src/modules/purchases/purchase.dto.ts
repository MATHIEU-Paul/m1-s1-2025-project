import { IsDateString, IsUUID } from 'class-validator';
import type { BookId } from '../books/entities/book.entity';
import type { ClientId } from '../clients/client.entity';

export class CreatePurchaseDto {
  @IsUUID(4)
  clientId: ClientId;

  @IsUUID(4)
  bookId: BookId;

  @IsDateString()
  purchaseDate: string;
}
