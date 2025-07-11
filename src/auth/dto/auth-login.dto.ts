import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsString()
  @MinLength(6)
  senha: string;
}
