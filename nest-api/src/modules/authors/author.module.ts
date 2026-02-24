import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from '../purchases/purchase.module';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]), PurchaseModule],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
