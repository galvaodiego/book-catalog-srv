import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { LivroResponseDto } from './dto/livro-response.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

@Injectable()
export class LivrosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLivroDto, userId: number): Promise<LivroResponseDto> {
    // Verifica se o livro já existe para o mesmo usuário com o mesmo ISBN
    const existente = await this.prisma.livro.findFirst({
      where: {
        usuarioId: userId,
        isbn: dto.isbn,
      },
    });

    if (existente) {
      throw new ConflictException('Este livro já está no seu catálogo');
    }

    const livro = await this.prisma.livro.create({
      data: {
        titulo: dto.titulo,
        isbn: dto.isbn,
        editora: dto.editora ?? null,
        paginas: dto.paginas ?? null,
        ano: dto.ano ?? null,
        autores: dto.autores ?? [],
        usuarioId: userId,
      },
    });

    return {
      id: livro.id,
      titulo: livro.titulo,
      isbn: livro.isbn,
      editora: livro.editora,
      paginas: livro.paginas,
      ano: livro.ano,
      autores: livro.autores,
      createdAt: livro.createdAt,
    };
  }

  async findAll(
    page: number,
    limit: number,
    userId: number,
  ): Promise<PaginatedResponseDto<LivroResponseDto>> {
    const [total, livros] = await this.prisma.$transaction([
      this.prisma.livro.count({ where: { usuarioId: userId } }),
      this.prisma.livro.findMany({
        where: { usuarioId: userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const data = livros.map((livro) => ({
      id: livro.id,
      titulo: livro.titulo,
      isbn: livro.isbn,
      editora: livro.editora,
      paginas: livro.paginas,
      ano: livro.ano,
      autores: livro.autores,
      createdAt: livro.createdAt,
    }));

    return {
      page,
      limit,
      totalRecords: total,
      data,
    };
  }

  async findOne(id: number, userId: number): Promise<LivroResponseDto> {
    const livro = await this.prisma.livro.findFirst({
      where: { id, usuarioId: userId },
    });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado para este usuário');
    }

    return {
      id: livro.id,
      titulo: livro.titulo,
      isbn: livro.isbn,
      editora: livro.editora,
      paginas: livro.paginas,
      ano: livro.ano,
      autores: livro.autores,
      createdAt: livro.createdAt,
    };
  }

  async update(
    id: number,
    dto: UpdateLivroDto,
    userId: number,
  ): Promise<LivroResponseDto> {
    const livro = await this.prisma.livro.findFirst({
      where: { id, usuarioId: userId },
    });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado para este usuário');
    }

    const updated = await this.prisma.livro.update({
      where: { id },
      data: {
        titulo: dto.titulo ?? livro.titulo,
        paginas: dto.paginas ?? livro.paginas,
        editora: dto.editora ?? livro.editora,
        ano: dto.ano ?? livro.ano,
        autores: dto.autores ?? livro.autores,
      },
    });

    return {
      id: updated.id,
      titulo: updated.titulo,
      isbn: updated.isbn,
      editora: updated.editora,
      paginas: updated.paginas,
      ano: updated.ano,
      autores: updated.autores,
      createdAt: updated.createdAt,
    };
  }

  async remove(id: number, userId: number): Promise<void> {
    const livro = await this.prisma.livro.findFirst({
      where: { id, usuarioId: userId },
    });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado para este usuário');
    }

    await this.prisma.livro.delete({ where: { id } });
  }
}
