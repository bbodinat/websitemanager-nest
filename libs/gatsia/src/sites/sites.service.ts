import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
  ) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const site = this.sitesRepository.create(createSiteDto);
    return this.sitesRepository.save(site);
  }

  async findAll(): Promise<Site[]> {
    return this.sitesRepository.find();
  }

  async findOne(id: number): Promise<Site> {
    return this.sitesRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateSiteDto: UpdateSiteDto): Promise<Site> {
    await this.sitesRepository.update(id, updateSiteDto);
    return this.sitesRepository.findOneBy({
      id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.sitesRepository.delete(id);
  }
}
