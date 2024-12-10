import { Module } from '@nestjs/common';
import { GatsiaService } from './gatsia.service';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';

import { LayoutsModule } from './layouts/layouts.module';

@Module({
  providers: [GatsiaService],
  exports: [GatsiaService],
  imports: [
    SitesModule,
    PagesModule,
    LayoutsModule,
  ],
})
export class GatsiaModule {}
