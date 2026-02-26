import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

export type GenreId = string & { __brand: 'Genre' };

@Entity('genres')
export class GenreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  @Column()
  name: string; 
}
