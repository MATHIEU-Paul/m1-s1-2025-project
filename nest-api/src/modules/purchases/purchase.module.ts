import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseEntity, ClientEntity, BookEntity]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseRepository, PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
