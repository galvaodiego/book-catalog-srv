import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { LivroResponseDto } from './dto/livro-response.dto';
import { Livro, Prisma } from '@prisma/client';

@Injectable()
export class LivrosService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateLivroDto,
    usuarioId: number,
  ): Promise<LivroResponseDto> {
    if (!usuarioId) {
      throw new BadRequestException('Usuário não identificado');
    }

    try {
      const livro = await this.prisma.livro.create({ data });

      await this.prisma.usuarioLivro.create({
        data: {
          usuarioId,
          livroId: livro.id,
        },
      });

      return this.mapToResponseDto(livro);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Já existe um livro com este ISBN cadastrado.',
        );
      }
      throw error;
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    userId: number,
  ): Promise<PaginatedResponseDto<LivroResponseDto>> {
    const skip = (page - 1) * limit;

    const [totalRecords, livros] = await this.prisma.$transaction([
      this.prisma.usuarioLivro.count({
        where: { usuarioId: userId },
      }),
      this.prisma.livro.findMany({
        where: {
          usuarios: {
            some: { usuarioId: userId },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const data = livros.map((livro) => this.mapToResponseDto(livro));

    return {
      totalRecords,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number): Promise<LivroResponseDto> {
    const livro = await this.prisma.livro.findUnique({ where: { id } });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }

    return this.mapToResponseDto(livro);
  }

  async update(
    id: number,
    data: UpdateLivroDto,
    userId: number,
  ): Promise<LivroResponseDto> {
    const associacao = await this.prisma.usuarioLivro.findUnique({
      where: {
        usuarioId_livroId: {
          usuarioId: userId,
          livroId: id,
        },
      },
    });

    if (!associacao) {
      throw new NotFoundException('Livro não encontrado para este usuário');
    }

    const livro = await this.prisma.livro.update({
      where: { id },
      data: {
        ...data,
        autores: data.autores as string[],
      },
    });

    return this.mapToResponseDto(livro);
  }

  async remove(id: number, userId: number) {
    const associacao = await this.prisma.usuarioLivro.findUnique({
      where: {
        usuarioId_livroId: {
          usuarioId: userId,
          livroId: id,
        },
      },
    });

    if (!associacao) {
      throw new NotFoundException('Livro não encontrado para este usuário');
    }

    await this.prisma.usuarioLivro.delete({
      where: {
        usuarioId_livroId: {
          usuarioId: userId,
          livroId: id,
        },
      },
    });

    return this.prisma.livro.delete({ where: { id } });
  }

  private mapToResponseDto(livro: Livro): LivroResponseDto {
    return {
      id: livro.id,
      titulo: livro.titulo,
      isbn: livro.isbn,
      editora: livro.editora,
      paginas: livro.paginas,
      ano: livro.ano,
      autores: Array.isArray(livro.autores)
        ? livro.autores.filter((a): a is string => typeof a === 'string')
        : [],
      createdAt: livro.createdAt,
    };
  }
}
