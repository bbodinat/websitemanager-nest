import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { IsInDBConstraint } from '../common/validators/is-in-db.validator';
import { Page } from '../pages/entities/page.entity';
import { PagesService } from '../pages/pages.service';

@Module({
  controllers: [SitesController],
  providers: [SitesService, IsInDBConstraint,PagesService],
  imports: [TypeOrmModule.forFeature([Site, Page])],
  exports: [IsInDBConstraint],
})
export class SitesModule {}
