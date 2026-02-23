import { Injectable } from '@nestjs/common';
import { CreatePurchaseModel, PurchaseModel } from './purchase.model';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  public async getAllPurchases(): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getAllPurchases();
  }

  public async createPurchase(
    input: CreatePurchaseModel,
  ): Promise<PurchaseModel> {
    return this.purchaseRepository.createPurchase(input);
  }
}
