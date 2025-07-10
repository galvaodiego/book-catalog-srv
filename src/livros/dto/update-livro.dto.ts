import { PartialType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './create-livro.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsArray } from 'class-validator';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {
  @ApiPropertyOptional({ description: 'Título do livro' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ description: 'ISBN do livro' })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiPropertyOptional({ description: 'Nome da editora' })
  @IsOptional()
  @IsString()
  editora?: string;

  @ApiPropertyOptional({ description: 'Número de páginas', minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  paginas?: number;

  @ApiPropertyOptional({ description: 'Ano de publicação' })
  @IsOptional()
  @IsInt()
  ano?: number;

  @ApiPropertyOptional({
    description: 'Lista de autores',
    type: [String],
    example: ['Autor 1', 'Autor 2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  autores?: string[];
}
