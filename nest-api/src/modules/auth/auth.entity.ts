import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type AuthUserId = string & { __brand: 'AuthUser' };

@Entity('auth_users')
export class AuthUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthUserId;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'varchar' })
  passwordHash: string;

  @Column({ name: 'password_salt', type: 'varchar' })
  passwordSalt: string;

  @Column({ name: 'session_token', type: 'varchar', nullable: true })
  sessionToken?: string | null;

  @Column({ name: 'session_expires_at', type: 'datetime', nullable: true })
  sessionExpiresAt?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
