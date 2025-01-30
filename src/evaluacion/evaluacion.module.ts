import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { Evaluacion } from 'src/entities/evaluacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
  exports:[EvaluacionService],
})
export class EvaluacionModule {}
