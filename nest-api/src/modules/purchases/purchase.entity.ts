import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import type { BookId } from '../books/entities/book.entity';
import { BookEntity } from '../books/entities/book.entity';
import type { ClientId } from '../clients/client.entity';
import { ClientEntity } from '../clients/client.entity';

export type PurchaseId = string & { __brand: 'Purchase' };

@Entity('purchases')
export class PurchaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: PurchaseId;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  @Column({ name: 'purchase_date', type: 'datetime' })
  purchaseDate: Date;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}
