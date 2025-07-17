import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { MessageResponseDto } from 'src/livros/dto/message-response.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<MessageResponseDto> {
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
          emailConfirmado: false,
        },
      });

      // Remover senha da resposta
      delete (usuario as Partial<typeof usuario>).senha;

      const response: MessageResponseDto = {
        message:
          'Usuário criado com sucesso, verifique seu email para confirmação e ativação da conta.',
        success: true,
      };

      return response;
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
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async confirmarEmail(email: string): Promise<void> {
    await this.prisma.usuario.update({
      where: { email },
      data: { emailConfirmado: true },
    });
  }

  // Método opcional para verificar se o email já está confirmado
  async isEmailConfirmado(email: string): Promise<boolean> {
    const usuario = await this.findByEmail(email);
    return usuario?.emailConfirmado ?? false;
  }
}
