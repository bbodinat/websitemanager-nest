import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { GatsiaModule } from '@gatsia/gatsia';
import { Site } from '@gatsia/gatsia/sites/entities/site.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    GatsiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
