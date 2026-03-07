import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserEntity } from './auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: Repository<AuthUserEntity>,
  ) {}

  public async getUserByUsername(
    username: string,
  ): Promise<AuthUserEntity | undefined> {
    const user = await this.authUserRepository.findOne({ where: { username } });
    return user ?? undefined;
  }

  public async getUserBySessionToken(
    token: string,
  ): Promise<AuthUserEntity | undefined> {
    const user = await this.authUserRepository.findOne({
      where: { sessionToken: token },
    });

    return user ?? undefined;
  }

  public async createUser(input: {
    username: string;
    passwordHash: string;
    passwordSalt: string;
  }): Promise<AuthUserEntity> {
    return this.authUserRepository.save(this.authUserRepository.create(input));
  }

  public async saveSession(
    id: AuthUserEntity['id'],
    token: string,
    sessionExpiresAt: Date,
  ): Promise<void> {
    await this.authUserRepository.update(id, {
      sessionToken: token,
      sessionExpiresAt,
    });
  }

  public async clearSession(id: AuthUserEntity['id']): Promise<void> {
    await this.authUserRepository.update(id, {
      sessionToken: null,
      sessionExpiresAt: null,
    });
  }
}
