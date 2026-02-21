import { Injectable } from '@nestjs/common';
import { ClientId } from './client.entity';
import {
    ClientModel,
    CreateClientModel,
    FilterClientsModel,
    UpdateClientModel,
} from './client.model';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(
    params?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    return this.clientRepository.getAllClients(params);
  }

  public async getClientById(id: ClientId): Promise<ClientModel | undefined> {
    return this.clientRepository.getClientById(id);
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
