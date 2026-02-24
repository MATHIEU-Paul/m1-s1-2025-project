import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateClientDto, GetAllClientsDto, UpdateClientDto } from './client.dto';
import { ClientId } from './client.entity';
import { FilterClientsModel } from './client.model';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients(@Query() rawParams: GetAllClientsDto) {
    const params: FilterClientsModel = {
      limit: rawParams.limit,
      offset: rawParams.offset,
    };

    // Convert sort string to object
    if (rawParams.sort) {
      // If sort is in the format "field:direction", e.g., "firstName:ASC",
      // else we assume it's just the field with default direction ASC
      const [key, direction] = rawParams.sort.includes(':') ? rawParams.sort.split(':') : [rawParams.sort, 'ASC'];
      params.sort = {
        [key]: direction
      };
    }

    const [data, totalCount] = await this.clientService.getAllClients(params);
    return { data, totalCount };
  }

  @Get(':id')
  async getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(id as ClientId);
  }

  @Post()
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id as ClientId, updateClientDto);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    await this.clientService.deleteClient(id as ClientId);
    return { message: 'Client deleted successfully' };
  }
}
