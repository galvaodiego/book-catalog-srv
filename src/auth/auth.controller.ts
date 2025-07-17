import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUsuarioDto } from '../users/dto/create-usuario.dto';
import { UsuarioService } from '../users/usuario.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/livros/dto/message-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @ApiBody({
    description: 'Dados para criação de uma nova conta',
    schema: {
      example: {
        nome: 'João da Silva',
        email: 'joao.silva@email.com',
        senha: '12345678',
        confirmarSenha: '12345678',
      },
    },
  })
  @ApiOkResponse({
    description: 'Usuário criado com sucesso',
    type: MessageResponseDto,
  })
  async register(@Body() dto: CreateUsuarioDto): Promise<MessageResponseDto> {
    return this.usuarioService.create(dto);
  }
}
