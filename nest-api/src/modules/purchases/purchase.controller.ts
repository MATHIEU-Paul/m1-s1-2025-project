import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookId } from '../books/entities/book.entity';
import { ClientId } from '../clients/client.entity';
import { CreatePurchaseDto } from './purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  public async getAllPurchases() {
    return this.purchaseService.getAllPurchases();
  }

  @Get('client/:clientId')
  public async getPurchasesByClientId(@Param('clientId') clientId: string) {
    return this.purchaseService.getPurchasesByClientId(clientId as ClientId);
  }

  @Get('book/:bookId')
  public async getPurchasesByBookId(@Param('bookId') bookId: string) {
    return this.purchaseService.getPurchasesByBookId(bookId as BookId);
  }

  @Post()
  public async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }
}
