import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  senha: string;
}
