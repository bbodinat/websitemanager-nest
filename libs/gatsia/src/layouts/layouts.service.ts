import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Layout } from './entities/layout.entity';

@Injectable()
export class LayoutsService {
  constructor(
    @InjectRepository(Layout)
    private layoutsRepository: Repository<Layout>,
  ) {}

  async create(createLayoutDto: CreateLayoutDto): Promise<Layout> {
    const layout = this.layoutsRepository.create(createLayoutDto);
    return this.layoutsRepository.save(layout);
  }

  async findAll(): Promise<Layout[]> {
    return this.layoutsRepository.find();
  }

  async findOne(id: number): Promise<Layout> {
    return this.layoutsRepository.findOneBy({ id });
  }

  async update(id: number, updateLayoutDto: UpdateLayoutDto): Promise<Layout> {
    await this.layoutsRepository.update(id, updateLayoutDto);
    return this.layoutsRepository.findOneBy({
      id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.layoutsRepository.delete(id);
  }
}
