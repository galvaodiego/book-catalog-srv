import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 1, description: 'Página atual' })
  page: number;

  @ApiProperty({ example: 10, description: 'Quantidade de itens por página' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total de registros encontrados' })
  totalRecords: number;

  @ApiProperty({
    description: 'Lista de itens da página atual',
    isArray: true,
    type: Object, // o Swagger vai entender via @ApiExtraModels no controller
  })
  data: T[];
}
