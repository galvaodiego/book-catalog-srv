import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}
