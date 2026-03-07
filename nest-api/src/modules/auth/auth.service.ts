import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import type { AuthUserEntity } from './auth.entity';
import type { AuthSessionModel, AuthUserModel } from './auth.model';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  private static readonly SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

  constructor(private readonly authRepository: AuthRepository) {}

  public async register(
    username: string,
    password: string,
  ): Promise<AuthSessionModel> {
    const normalizedUsername = username.trim().toLowerCase();
    const existingUser =
      await this.authRepository.getUserByUsername(normalizedUsername);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const passwordSalt = randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(password, passwordSalt);

    const user = await this.authRepository.createUser({
      username: normalizedUsername,
      passwordHash,
      passwordSalt,
    });

    return this.createSessionForUser(user);
  }

  public async login(
    username: string,
    password: string,
  ): Promise<AuthSessionModel> {
    const normalizedUsername = username.trim().toLowerCase();
    const user =
      await this.authRepository.getUserByUsername(normalizedUsername);

    if (
      !user ||
      !this.verifyPassword(password, user.passwordSalt, user.passwordHash)
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.createSessionForUser(user);
  }

  public async getCurrentUser(token: string): Promise<AuthUserModel> {
    const user = await this.authRepository.getUserBySessionToken(token);

    if (!user || !user.sessionExpiresAt) {
      throw new UnauthorizedException('Invalid authentication token');
    }

    if (user.sessionExpiresAt.getTime() < Date.now()) {
      await this.authRepository.clearSession(user.id);
      throw new UnauthorizedException('Session expired');
    }

    return this.toAuthUserModel(user);
  }

  public async logout(token: string): Promise<void> {
    const user = await this.authRepository.getUserBySessionToken(token);
    if (!user) {
      return;
    }

    await this.authRepository.clearSession(user.id);
  }

  private async createSessionForUser(
    user: AuthUserEntity,
  ): Promise<AuthSessionModel> {
    const token = randomBytes(32).toString('hex');
    const sessionExpiresAt = new Date(
      Date.now() + AuthService.SESSION_DURATION_MS,
    );

    await this.authRepository.saveSession(user.id, token, sessionExpiresAt);

    return {
      token,
      user: this.toAuthUserModel(user),
    };
  }

  private toAuthUserModel(user: AuthUserEntity): AuthUserModel {
    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    };
  }

  private hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 120_000, 64, 'sha512').toString('hex');
  }

  private verifyPassword(
    password: string,
    salt: string,
    expectedHash: string,
  ): boolean {
    const computedHash = this.hashPassword(password, salt);

    const expected = Buffer.from(expectedHash, 'hex');
    const actual = Buffer.from(computedHash, 'hex');

    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  }
}
