import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';
import { PurchaseEntity } from './purchase.entity';
import { CreatePurchaseModel, PurchaseModel } from './purchase.model';

@Injectable()
export class PurchaseRepository {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  public async getAllPurchases(): Promise<PurchaseModel[]> {
    const purchases = await this.purchaseRepository.find({
      order: { purchaseDate: 'DESC' },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      clientId: purchase.clientId,
      bookId: purchase.bookId,
      purchaseDate: purchase.purchaseDate.toISOString(),
    }));
  }

  public async createPurchase(
    input: CreatePurchaseModel,
  ): Promise<PurchaseModel> {
    const client = await this.clientRepository.findOne({
      where: { id: input.clientId },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    const book = await this.bookRepository.findOne({
      where: { id: input.bookId },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    const purchase = await this.purchaseRepository.save(
      this.purchaseRepository.create({
        clientId: input.clientId,
        bookId: input.bookId,
        purchaseDate: new Date(input.purchaseDate),
      }),
    );

    return {
      id: purchase.id,
      clientId: purchase.clientId,
      bookId: purchase.bookId,
      purchaseDate: purchase.purchaseDate.toISOString(),
    };
  }
}
