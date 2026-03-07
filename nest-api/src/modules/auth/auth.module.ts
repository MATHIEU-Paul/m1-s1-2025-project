import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthUserEntity } from './auth.entity';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserEntity])],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
})
export class AuthModule {}
