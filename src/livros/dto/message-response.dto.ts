import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indica se a operação foi bem-sucedida',
  })
  success: boolean;

  @ApiProperty({
    example: 'Operação realizada com sucesso',
    description: 'Mensagem de resposta da operação',
  })
  message: string;
}
