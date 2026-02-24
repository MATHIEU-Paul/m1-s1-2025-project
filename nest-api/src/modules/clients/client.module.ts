import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from '../purchases/purchase.module';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), PurchaseModule],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
