import { ApiProperty } from '@nestjs/swagger';

export class LivroResponseDto {
  @ApiProperty({ description: 'Identificador único do livro' })
  id: number;

  @ApiProperty({ description: 'Título do livro' })
  titulo: string;

  @ApiProperty({ description: 'ISBN do livro' })
  isbn: string;

  @ApiProperty({
    description: 'Nome da editora',
    required: false,
    nullable: true,
  })
  editora?: string | null;

  @ApiProperty({
    description: 'Número total de páginas',
    required: false,
    nullable: true,
  })
  paginas?: number | null;

  @ApiProperty({
    description: 'Ano de publicação',
    required: false,
    nullable: true,
  })
  ano?: number | null;

  @ApiProperty({
    description: 'Lista de autores',
    type: [String],
    required: false,
    nullable: true,
  })
  autores?: string[] | null;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: Date;
}
