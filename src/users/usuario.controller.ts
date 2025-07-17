import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { MessageResponseDto } from 'src/livros/dto/message-response.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() dto: CreateUsuarioDto): Promise<MessageResponseDto> {
    const response = await this.usuarioService.create(dto);
    return response;
  }
}
