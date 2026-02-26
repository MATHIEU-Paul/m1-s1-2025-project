import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { BookTypeEntity } from '../books/entities/booktype.entity';
import { GenreEntity } from '../books/entities/genre.entity';
import { ClientEntity } from '../clients/client.entity';
import { PurchaseEntity } from '../purchases/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [
        AuthorEntity,
        BookEntity,
        BookTypeEntity,
        GenreEntity,
        ClientEntity,
        PurchaseEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
