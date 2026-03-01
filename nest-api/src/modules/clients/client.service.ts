import { Injectable } from '@nestjs/common';
import { PurchaseService } from '../purchases/purchase.service';
import { ClientId } from './client.entity';
import {
  ClientDetailsModel,
  ClientModel,
  ClientWithPurchaseCountModel,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
} from './client.model';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly purchaseService: PurchaseService,
  ) {}

  public async getAllClients(
    params?: FilterClientsModel,
  ): Promise<[ClientWithPurchaseCountModel[], number]> {
    const [clients, totalCount] =
      await this.clientRepository.getAllClients(params);

    const purchaseCountsByClientId =
      await this.purchaseService.getPurchaseCountsByClientIds(
        clients.map((client) => client.id),
      );

    const clientsWithCount = clients.map((client) => ({
      ...client,
      purchaseCount: purchaseCountsByClientId[client.id] ?? 0,
    }));

    return [clientsWithCount, totalCount];
  }

  public async getClientById(
    id: ClientId,
  ): Promise<ClientDetailsModel | undefined> {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      return undefined;
    }

    const purchases = await this.purchaseService.getPurchasesByClientId(id);

    return {
      ...client,
      purchases,
    };
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.createClient(client);
  }

  public async updateClient(
    id: ClientId,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.getClientById(id);
    if (!oldClient) {
      return undefined;
    }

    return this.clientRepository.updateClient(id, client);
  }

  public async deleteClient(id: ClientId): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
