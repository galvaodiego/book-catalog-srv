import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../users/usuario.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthLoginDto) {
    const usuario = await this.usuarioService.findByEmail(data.email);

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(data.senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
