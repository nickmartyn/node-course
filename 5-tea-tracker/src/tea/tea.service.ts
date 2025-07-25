import { Injectable } from '@nestjs/common';
import { Tea } from './tea.entity';
import { CreateTeaDTO } from './dto/createTea.dto';
import { UpdateTeaDTO } from './dto/updateTea.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { TeaResponseDTO } from './dto/teaResponse.dto';

const baseArr = [
  {
    id: '1753092196471',
    name: 'green',
    origin: 'india',
    rating: 10,
    brewTemp: 60,
    notes: 'string',
  },
  {
    id: '1753092231648',
    name: 'black',
    origin: 'shrilanka',
    rating: 10,
    brewTemp: 60,
    notes: 'string',
  },
  {
    id: '1753092232048',
    name: 'oulung',
    origin: 'china',
    rating: 10,
    brewTemp: 60,
    notes: 'string',
  },
  {
    id: '1753092232438',
    name: 'monomah',
    origin: 'unknown',
    rating: 6,
    brewTemp: 60,
    notes: 'string',
  },
  {
    id: '1753092232804',
    name: 'custom',
    origin: 'tibeth',
    rating: 8,
    brewTemp: 90,
    notes: 'string',
  },
];

@Injectable()
export class TeaService {
  private store: Map<string, Tea> = new Map();

  constructor() {
    // Initialize with base data
    baseArr.forEach((tea) => {
      this.store.set(tea.id, tea);
    });
  }

  async createTea(teaData: CreateTeaDTO): Promise<void> {
    const id = Date.now().toString();
    const tea: Tea = { id, ...teaData } as Tea;
    await Promise.resolve(this.store.set(id, tea));
    return;
  }

  getAllTeas(minRating, pagination?: PaginationDTO): Promise<TeaResponseDTO> {
    const allData = Array.from(this.store.values()).filter((tea) => {
      if (minRating) {
        return tea.rating >= minRating;
      }
      return true;
    });
    let data: Tea[] = [];
    if (pagination?.offset && pagination.limit) {
      console.log('apply pagination');
      const { offset, limit } = pagination;
      console.log('offset', offset, 'limit', limit);
      const startIndex = (offset - 1) * limit;
      const endIndex = startIndex + limit;
      data = allData.slice(startIndex, endIndex);
      console.log('data', data);
    } else {
      console.log('no pagination');
      data = allData;
    }
    const total = allData.length;
    return Promise.resolve({
      data,
      total,
      pageSize: pagination?.limit || total,
      currentPage: pagination?.offset || 1,
      totalPages: Math.ceil(total / (pagination?.limit || total)),
    });
  }

  getTeaById(id: string): Promise<Tea | undefined> {
    return Promise.resolve(this.store.get(id));
  }

  updateTea(id: string, payload: UpdateTeaDTO): Promise<Tea | null> {
    if (!this.store.has(id)) {
      return Promise.resolve(null);
    }
    const updatedTea = { ...this.store.get(id), ...payload } as Tea;
    this.store.set(id, updatedTea);
    return Promise.resolve(updatedTea);
  }

  deleteTea(id: string): Promise<string | null> {
    if (!this.store.has(id)) {
      return Promise.resolve(null);
    }
    this.store.delete(id);
    return Promise.resolve(id);
  }
}
