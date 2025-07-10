import { ApiProperty } from '@nestjs/swagger';

export class LivroResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty({ required: false, nullable: true })
  editora?: string | null;

  @ApiProperty({ required: false, nullable: true })
  paginas?: number | null;

  @ApiProperty({ required: false, nullable: true })
  ano?: number | null;

  @ApiProperty({ required: false, type: [String], nullable: true })
  autores?: string[] | null;

  @ApiProperty()
  createdAt: Date;
}
