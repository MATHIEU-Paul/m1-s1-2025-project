import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credentials: AuthCredentialsDto) {
    return this.authService.register(
      credentials.username,
      credentials.password,
    );
  }

  @Post('login')
  async login(@Body() credentials: AuthCredentialsDto) {
    return this.authService.login(credentials.username, credentials.password);
  }

  @Get('me')
  async me(@Headers('authorization') authHeader?: string) {
    const token = this.extractToken(authHeader);
    return this.authService.getCurrentUser(token);
  }

  @Post('logout')
  async logout(@Headers('authorization') authHeader?: string) {
    const token = this.extractToken(authHeader);
    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }

  private extractToken(authHeader?: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    return token;
  }
}
