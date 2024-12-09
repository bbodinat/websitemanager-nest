import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const newPage = this.pagesRepository.create(createPageDto);
    return this.pagesRepository.save(newPage);
  }

  findAll(): Promise<Page[]> {
    return this.pagesRepository.find();
  }
  
  findOne(id: number): Promise<Page> {
    return this.pagesRepository.findOneBy({ id });
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    await this.pagesRepository.update(id, updatePageDto);
    return this.pagesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pagesRepository.delete(id);
  }
}
