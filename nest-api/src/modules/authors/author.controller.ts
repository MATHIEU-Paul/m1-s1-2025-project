import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  public async getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(id as any);
  }

  @Patch(':id')
  public async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id as any, updateAuthorDto);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string) {
    await this.authorService.deleteAuthor(id as any);
    return { message: 'Author deleted successfully' };
  }
}
