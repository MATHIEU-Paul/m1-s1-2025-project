import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { AuthorId } from '../authors/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  numberpages: number;

  // @IsUUID(4)
  // BookType : TypeModel;

  // @IsUUID(4)
  // Genre : GenreModel;

  @IsString()
  @IsOptional()
  coverImage?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUUID(4)
  @IsOptional()
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  @IsOptional()
  yearPublished: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  numberpages: number;

  @IsUUID(4)
  @IsOptional()
  bookTypeId: string;  

  @IsUUID(4)
  @IsOptional()
  genreId: string;  

  @IsString()
  @IsOptional()
  coverImage?: string;
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
