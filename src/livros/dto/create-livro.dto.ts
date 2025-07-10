import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLivroDto {
  @ApiProperty({ description: 'Título do livro' })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'ISBN do livro', example: '9781234567890' })
  @IsNotEmpty()
  @IsString()
  isbn: string;

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
