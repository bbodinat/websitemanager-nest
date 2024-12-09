import { Module } from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { LayoutsController } from './layouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Layout } from './entities/layout.entity';

@Module({
  controllers: [LayoutsController],
  providers: [LayoutsService],
  imports: [TypeOrmModule.forFeature([Layout])],
})
export class LayoutsModule {}
