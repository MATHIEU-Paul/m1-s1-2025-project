import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message:
      'username must contain only letters, numbers, underscore, dot or hyphen',
  })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
