import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class GetAllClientsDto {
  @IsInt()
  @Min(1)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
