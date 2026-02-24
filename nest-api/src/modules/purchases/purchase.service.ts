import { Injectable } from '@nestjs/common';
import { AuthorId } from '../authors/author.entity';
import { BookId } from '../books/entities/book.entity';
import { ClientId } from '../clients/client.entity';
import {
  BookPurchaseDetailsModel,
  ClientPurchaseDetailsModel,
  CreatePurchaseModel,
  PurchaseModel,
} from './purchase.model';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  public async getAllPurchases(): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getAllPurchases();
  }

  public async getPurchasesByClientId(
    clientId: ClientId,
  ): Promise<ClientPurchaseDetailsModel[]> {
    return this.purchaseRepository.getPurchasesByClientId(clientId);
  }

  public async getPurchasesByBookId(bookId: BookId): Promise<BookPurchaseDetailsModel[]> {
    return this.purchaseRepository.getPurchasesByBookId(bookId);
  }

  public async getPurchaseCountsByClientIds(
    clientIds: ClientId[],
  ): Promise<Record<string, number>> {
    return this.purchaseRepository.getPurchaseCountsByClientIds(clientIds);
  }

  public async getPurchaseCountsByBookIds(
    bookIds: BookId[],
  ): Promise<Record<string, number>> {
    return this.purchaseRepository.getPurchaseCountsByBookIds(bookIds);
  }

  public async getPurchaseCountByAuthorId(
    authorId: AuthorId,
  ): Promise<number> {
    return this.purchaseRepository.getPurchaseCountByAuthorId(authorId);
  }

  public async createPurchase(
    input: CreatePurchaseModel,
  ): Promise<PurchaseModel> {
    return this.purchaseRepository.createPurchase(input);
  }
}
