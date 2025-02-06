import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { Evaluacion } from 'src/entities/evaluacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Chofer,Combi])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
  exports:[EvaluacionService],
})
export class EvaluacionModule {}
