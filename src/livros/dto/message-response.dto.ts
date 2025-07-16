import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indica se a operação foi bem-sucedida (true = sucesso)',
  })
  success: boolean;

  @ApiProperty({
    example: 'Operação realizada com sucesso',
    description: 'Mensagem descritiva sobre o resultado da operação',
  })
  message: string;
}
