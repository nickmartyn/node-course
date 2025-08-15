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
import {
  PaginationDTO,
  ApiPaginationDTO,
  IPaginationDTO,
} from './dto/pagination.dto';
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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiSecurity,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('tea')
@UseGuards(AuthGuard)
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Post()
  @ApiSecurity('x-api-key')
  @ApiBody({ type: ApiCreateTeaDTO })
  @Throttle({ default: { limit: 10, ttl: 60000 } })
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
  @ApiQuery({
    name: 'minRating',
    required: false,
    type: Number,
    description: 'Filter teas by minimum rating',
  })
  @ApiQuery({
    name: 'pagination',
    required: false,
    type: ApiPaginationDTO,
    description: 'Pagination parameters',
  })
  async getAllTeas(
    @Query('minRating') minRating?: number,
    @Query('pagination') pagination?: PaginationDTO,
  ): Promise<TeaResponseDTO> {
    const paginationObj = pagination
      ? (JSON.parse(pagination as unknown as string) as PaginationDTO)
      : {};
    return this.teaService.getAllTeas(
      minRating,
      paginationObj as unknown as IPaginationDTO,
    );
  }

  @Get(':id')
  @ApiSecurity('x-api-key')
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
  @ApiSecurity('x-api-key')
  @ApiBody({ type: ApiUpdateTeaDTO })
  async updateTea(
    @Param('id') id: string,
    @ZBody(UpdateTeaSchema)
    payload: UpdateTeaDTO,
  ): Promise<Tea | null> {
    const updatedTea = await this.teaService.updateTea(id, payload);
    console.log('Updated tea:', updatedTea);
    if (updatedTea === null) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
    return updatedTea;
  }

  @Delete(':id')
  @ApiSecurity('x-api-key')
  async deleteTea(@Param('id') id: string): Promise<string | null> {
    const deletedTeaId = await this.teaService.deleteTea(id);
    if (deletedTeaId === null) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
    return deletedTeaId;
  }
}
