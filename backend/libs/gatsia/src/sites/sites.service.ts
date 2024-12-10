import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Page } from '../pages/entities/page.entity';

@Injectable()
export class SitesService extends TypeOrmCrudService<Site> {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>, // Inject Page repository
  ) {
    super(sitesRepository);
  }

  async createPage(id: number, createPageDto: any) {
    const site = await this.sitesRepository.findOneBy({ id });
    // Create a new Page entity

    const page = await this.pagesRepository.save({
      ...createPageDto,
      order: site.pages.length,
      site,
    });
    // Save the Page entity
    // await this.pagesRepository.save(page);
    // Reload and return the updated site with the new page
    return this.sitesRepository.findOne({
      where: { id },
      relations: ['pages'],
    });
  }

  async updatePage(id: number, pageId: number, updatePageDto: any) {
    // Update the Page entity
    await this.pagesRepository.update(pageId, updatePageDto);
    // Reload and return the updated site with the updated page
    return this.sitesRepository.findOne({
      where: { id },
      relations: ['pages'],
    });
  }

  async deletePage(id: number, pageId: number) {
    // Delete the Page entity
    await this.pagesRepository.delete(pageId);
    // Reload and return the updated site with the deleted page
    return this.sitesRepository.findOne({
      where: { id },
      relations: ['pages'],
    });
  }
}
// https://github.com/nestjsx/crud/blob/master/integration/crud-typeorm/companies/companies.service.ts
