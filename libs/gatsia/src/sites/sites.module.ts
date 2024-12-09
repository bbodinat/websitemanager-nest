import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Page } from '../pages/entities/page.entity';

@Module({
  controllers: [SitesController],
  providers: [SitesService],
  imports: [
    TypeOrmModule.forFeature([
      Site
    ]),
  ],
})
export class SitesModule {}
