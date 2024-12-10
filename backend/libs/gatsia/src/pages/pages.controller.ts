import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Page,
  },
  
  query: {
    // filter: {
    //   siteId: {
    //     $eq: 12
    //   }
    // },
    join: {
      layout: {eager: true},
      site: { eager: true, alias: "site" }, // Allow filtering by site relation
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'], // Enable specific routes
  },
})
@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(public service: PagesService) {}
}