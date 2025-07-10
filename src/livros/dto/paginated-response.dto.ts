import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 1, description: 'Página atual' })
  page: number;

  @ApiProperty({ example: 10, description: 'Quantidade de itens por página' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total de registros' })
  totalRecords: number;

  @ApiProperty({ isArray: true, type: Object }) // mantemos genérico aqui
  data: T[];
}
