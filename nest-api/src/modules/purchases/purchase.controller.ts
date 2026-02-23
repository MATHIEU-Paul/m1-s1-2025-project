import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePurchaseDto } from './purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  public async getAllPurchases() {
    return this.purchaseService.getAllPurchases();
  }

  @Post()
  public async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }
}
