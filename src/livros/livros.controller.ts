import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import {
  ApiOkResponse,
  ApiTags,
  ApiExtraModels,
  getSchemaPath,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { LivroResponseDto } from './dto/livro-response.dto';
import { SingleResponseDto } from '../shared/dto/single-response.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@ApiTags('Livros')
@ApiExtraModels(
  PaginatedResponseDto,
  LivroResponseDto,
  SingleResponseDto,
  MessageResponseDto,
)
@UseGuards(AuthGuard('jwt'))
@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @ApiOkResponse({
    description: 'Cria um novo livro',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SingleResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(LivroResponseDto) },
          },
        },
      ],
    },
  })
  async create(
    @Body() dto: CreateLivroDto,
    @Req() req: RequestWithUser,
  ): Promise<SingleResponseDto<LivroResponseDto>> {
    const userId = req.user.sub;
    const livro = await this.livrosService.create(dto, userId);
    return {
      success: true,
      data: livro,
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista paginada de livros',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LivroResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: RequestWithUser,
  ): Promise<PaginatedResponseDto<LivroResponseDto>> {
    const userId = req.user.sub;
    return this.livrosService.findAll(page, limit, userId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Detalhes de um livro',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SingleResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(LivroResponseDto) },
          },
        },
      ],
    },
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ): Promise<SingleResponseDto<LivroResponseDto>> {
    const userId = req.user.sub;
    const livro = await this.livrosService.findOne(id, userId);
    return {
      success: true,
      data: livro,
    };
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Atualiza um livro existente',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SingleResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(LivroResponseDto) },
          },
        },
      ],
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLivroDto,
    @Req() req: RequestWithUser,
  ): Promise<SingleResponseDto<LivroResponseDto>> {
    const userId = req.user.sub;
    const livro = await this.livrosService.update(id, dto, userId);
    return {
      success: true,
      data: livro,
    };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove um livro pelo ID',
    schema: {
      $ref: getSchemaPath(MessageResponseDto),
    },
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ): Promise<MessageResponseDto> {
    const userId = req.user.sub;
    await this.livrosService.remove(id, userId);
    return {
      success: true,
      message: 'Livro removido com sucesso',
    };
  }
}
