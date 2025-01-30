import { Module } from '@nestjs/common';
import { CombiService } from './combi.service';
import { CombiController } from './combi.controller';
import { Combi } from 'src/entities/combi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Combi])],
  providers: [CombiService],
  controllers: [CombiController],
  exports:[CombiService],
})
export class CombiModule {}
