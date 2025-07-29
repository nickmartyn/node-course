import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTeaDTO,
  CreateTeaSchema,
  ApiCreateTeaDTO,
} from './dto/createTea.dto';
import {
  UpdateTeaDTO,
  UpdateTeaSchema,
  ApiUpdateTeaDTO,
} from './dto/updateTea.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { TeaService } from './tea.service';
import { Tea } from './tea.entity';
import { ZBody } from '../decorators/zbody.decorator';
import {
  GetAllTeasApiResponseDTO,
  TeaResponseDTO,
} from './dto/teaResponse.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../guards/public.guard';
import { Throttle } from '@nestjs/throttler';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tea')
@UseGuards(AuthGuard)
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Post()
  @ApiBody({ type: ApiCreateTeaDTO })
  @Throttle({ default: { limit: 1, ttl: 6000 } })
  @ApiCreatedResponse({
    type: ApiCreateTeaDTO,
  })
  async createTea(
    @Body('body')
    @ZBody(CreateTeaSchema)
    body: CreateTeaDTO,
  ): Promise<void> {
    return this.teaService.createTea(body);
  }

  @Get()
  @Public()
  @ApiCreatedResponse({
    type: GetAllTeasApiResponseDTO,
  })
  async getAllTeas(
    @Query('minRating') minRating?: number,
    @Query('pagination') pagination?: string,
  ): Promise<TeaResponseDTO> {
    const paginationObj: PaginationDTO | object = pagination
      ? (JSON.parse(pagination) as PaginationDTO)
      : {};
    return this.teaService.getAllTeas(
      minRating,
      paginationObj as PaginationDTO,
    );
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Tea,
  })
  async getTeaById(@Param('id') id: string): Promise<Tea | undefined> {
    const tea = await this.teaService.getTeaById(id);
    if (!tea) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
    return this.teaService.getTeaById(id);
  }

  @Put(':id')
  @ApiBody({ type: ApiUpdateTeaDTO })
  updateTea(
    @Param('id') id: string,
    @ZBody(UpdateTeaSchema)
    payload: UpdateTeaDTO,
  ): Promise<Tea | null> {
    return this.teaService.updateTea(id, payload);
  }

  @Delete(':id')
  deleteTea(@Param('id') id: string): Promise<string | null> {
    return this.teaService.deleteTea(id);
  }
}
