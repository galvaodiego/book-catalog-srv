import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { UsuarioService } from './usuario.service';
import { SingleResponseDto } from 'src/shared/dto/single-response.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(
    @Body() dto: CreateUsuarioDto,
  ): Promise<SingleResponseDto<UsuarioResponseDto>> {
    const usuario = await this.usuarioService.create(dto);
    return {
      success: true,
      data: usuario,
    };
  }
}
