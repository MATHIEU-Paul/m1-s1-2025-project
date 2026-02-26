import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { PurchaseModule } from '../purchases/purchase.module';
import { BookMetadataService } from './book-metadata.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';
import { BookTypeEntity } from './entities/booktype.entity';
import { GenreEntity } from './entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      BookTypeEntity,
      GenreEntity,
    ]),
    PurchaseModule,
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService, BookMetadataService],
})
export class BookModule {}
