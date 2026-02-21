import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import { ClientModule } from './modules/clients/client.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
