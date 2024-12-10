import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Layout } from './entities/layout.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class LayoutsService extends TypeOrmCrudService<Layout> {
  constructor(
    @InjectRepository(Layout)
    private layoutsRepository: Repository<Layout>,
  ) {
    super(layoutsRepository);
  }

}
