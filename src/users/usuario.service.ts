import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    try {
      const existe = await this.prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (existe) {
        throw new ConflictException('Email já cadastrado');
      }

      const senhaHash = await bcrypt.hash(data.senha, 10);

      const usuario = await this.prisma.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: senhaHash,
        },
      });

      delete (usuario as Partial<typeof usuario>).senha;

      return usuario;
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Email já cadastrado');
      }

      throw err;
    }
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
