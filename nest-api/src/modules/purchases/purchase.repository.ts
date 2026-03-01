import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorId } from '../authors/author.entity';
import { BookEntity, BookId } from '../books/entities/book.entity';
import { ClientEntity, ClientId } from '../clients/client.entity';
import { PurchaseEntity } from './purchase.entity';
import {
  BookPurchaseDetailsModel,
  ClientPurchaseDetailsModel,
  CreatePurchaseModel,
  PurchaseModel,
} from './purchase.model';

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

  public async getPurchasesByClientId(
    clientId: ClientId,
  ): Promise<ClientPurchaseDetailsModel[]> {
    const purchases = await this.purchaseRepository.find({
      where: { clientId },
      relations: {
        book: {
          author: true,
        },
      },
      order: {
        purchaseDate: 'DESC',
      },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      bookId: purchase.bookId,
      bookTitle: purchase.book.title,
      bookAuthor: `${purchase.book.author.firstName} ${purchase.book.author.lastName}`,
      purchaseDate: purchase.purchaseDate.toISOString(),
      bookCoverPath: purchase.book.coverPath,
    }));
  }

  public async getPurchasesByBookId(
    bookId: BookId,
  ): Promise<BookPurchaseDetailsModel[]> {
    const purchases = await this.purchaseRepository.find({
      where: { bookId },
      relations: {
        client: true,
      },
      order: {
        purchaseDate: 'DESC',
      },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      clientId: purchase.clientId,
      clientFirstName: purchase.client.firstName,
      clientLastName: purchase.client.lastName,
      clientImagePath: purchase.client.imagePath,
      purchaseDate: purchase.purchaseDate.toISOString(),
    }));
  }

  public async getPurchaseCountsByClientIds(
    clientIds: ClientId[],
  ): Promise<Record<ClientId, number>> {
    if (clientIds.length === 0) {
      return {};
    }

    const rows = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .select('purchase.clientId', 'clientId')
      .addSelect('COUNT(purchase.id)', 'count')
      .where('purchase.clientId IN (:...clientIds)', { clientIds })
      .groupBy('purchase.clientId')
      .getRawMany<{ clientId: string; count: string }>();

    return rows.reduce<Record<ClientId, number>>((acc, row) => {
      acc[row.clientId] = Number(row.count);
      return acc;
    }, {});
  }

  public async getPurchaseCountsByBookIds(
    bookIds: BookId[],
  ): Promise<Record<BookId, number>> {
    if (bookIds.length === 0) {
      return {};
    }

    const rows = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .select('purchase.bookId', 'bookId')
      .addSelect('COUNT(purchase.id)', 'count')
      .where('purchase.bookId IN (:...bookIds)', { bookIds })
      .groupBy('purchase.bookId')
      .getRawMany<{ bookId: string; count: string }>();

    return rows.reduce<Record<BookId, number>>((acc, row) => {
      acc[row.bookId] = Number(row.count);
      return acc;
    }, {});
  }

  public async getPurchaseCountByAuthorId(authorId: AuthorId): Promise<number> {
    return this.purchaseRepository.count({
      where: {
        book: {
          authorId,
        },
      },
      relations: {
        book: true,
      },
    });
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
