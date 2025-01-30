import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { Evaluacion } from '../entities/evaluacion.entity';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Get()
  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Evaluacion> {
    return this.evaluacionService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Evaluacion>): Promise<Evaluacion> {
    return this.evaluacionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Evaluacion>): Promise<Evaluacion> {
    return this.evaluacionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.evaluacionService.delete(id);
  }
}