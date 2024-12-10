import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { Crud } from '@dataui/crud';
import { Layout } from './entities/layout.entity';

@Crud({
  model: {
    type: Layout,
  },
  dto: {
    create: CreateLayoutDto,
    update: UpdateLayoutDto,
  },
  query: {
    join: {
      pages: {
        eager: true,
      },
      site: {
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
@Controller('layouts')
export class LayoutsController {
  constructor(public service: LayoutsService) {}
}
