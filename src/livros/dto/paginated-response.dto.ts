import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 1, description: 'Número da página atual' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Quantidade máxima de itens por página',
  })
  limit: number;

  @ApiProperty({
    example: 100,
    description: 'Total geral de registros encontrados (sem paginação)',
  })
  totalRecords: number;

  @ApiProperty({
    description: 'Itens retornados na página atual',
    isArray: true,
    type: Object, // o tipo real será resolvido no @ApiExtraModels do controller
  })
  data: T[];
}
