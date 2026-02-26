import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type BookTypeId = string & { __brand: 'BookType' };

@Entity('book_types')
export class BookTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookTypeId;

  @Column()
  name: string; 
}