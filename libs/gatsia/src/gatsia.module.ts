import { Module } from '@nestjs/common';
import { GatsiaService } from './gatsia.service';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './sites/entities/site.entity';
import { Page } from './pages/entities/page.entity';
import { LayoutsModule } from './layouts/layouts.module';
import { Layout } from './layouts/entities/layout.entity';

@Module({
  providers: [GatsiaService],
  exports: [GatsiaService],
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'database.sqlite',
    //   entities: [Site, Page, Layout],
    //   synchronize: true,
    // }),
    SitesModule,
    PagesModule,
    LayoutsModule,
  ],
})
export class GatsiaModule {}
