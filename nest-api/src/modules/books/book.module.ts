import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { PurchaseModule } from '../purchases/purchase.module';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity]), PurchaseModule],
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}
