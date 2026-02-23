import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import { ClientModule } from './modules/clients/client.module';
import { DatabaseModule } from './modules/database/database.module';
import { ImagesModule } from './modules/images/images.module';
import { PurchaseModule } from './modules/purchases/purchase.module';

@Module({
  imports: [
    DatabaseModule,
    AuthorModule,
    BookModule,
    ClientModule,
    ImagesModule,
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
