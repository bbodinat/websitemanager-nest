import { Injectable, Logger } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class PagesService  extends TypeOrmCrudService<Page> {
  constructor(
    @InjectRepository(Page)
    public pagesRepository: Repository<Page>,
  ) {
    super(pagesRepository);
  }
}
