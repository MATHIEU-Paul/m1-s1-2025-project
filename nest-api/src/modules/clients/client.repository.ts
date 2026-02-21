import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, ClientId } from './client.entity';
import {
    ClientModel,
    CreateClientModel,
    FilterClientsModel,
    UpdateClientModel,
} from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    return  this.clientRepository.findAndCount({
        take: input?.limit,
        skip: input?.offset,
        order: input?.sort,
    })
  }

  public async getClientById(id: ClientId): Promise<ClientModel | undefined> {
    const client = await this.clientRepository.findOne({ where: { id } });
    return client ?? undefined;
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async updateClient(
    id: ClientId,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    await this.clientRepository.update(id, client);
    return this.getClientById(id);
  }

  public async deleteClient(id: ClientId): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
