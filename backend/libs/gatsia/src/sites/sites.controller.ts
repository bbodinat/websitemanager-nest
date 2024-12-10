import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Crud } from '@dataui/crud';
import { Site } from './entities/site.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreatePageDto } from '../pages/dto/create-page.dto';
import { PagesService } from '../pages/pages.service';

@Crud({
  model: {
    type: Site,
  },
  dto: {
    // create: CreateSiteDto,
    update: UpdateSiteDto,
  },
  query: {
    join: {
      pages: {
        eager: true,
      },
      layouts: {
        eager: true,
      },
    },
  },
  routes: {
    only: [
      'createOneBase',
      'getManyBase',
      'getOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
@ApiTags('sites')
@Controller('sites')
export class SitesController {
  constructor(
    public service: SitesService,
    private readonly pagesService: PagesService,
  ) {}
  @Post(':id/pages')
  async createPage(
    @Param('id') id: number,
    @Body() createPageDto: CreatePageDto,
  ) {
    return this.pagesService.pagesRepository.save({  
      ...createPageDto,
      order: 0,
      site: { id },
    });
  }

  @Patch(':id/pages/:pageId')
  async updatePage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
    @Body() updatePageDto: CreatePageDto,
  ) {
    return this.pagesService.pagesRepository.update(pageId, updatePageDto);
  }

  @Delete(':id/pages/:pageId')
  async deletePage(@Param('id') id: number, @Param('pageId') pageId: number) {
    return this.pagesService.pagesRepository.delete(pageId);
  }
}
