import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { Evaluacion } from '../entities/evaluacion.entity';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Get('total')
  async countEvalutations(): Promise<number> {
    return this.evaluacionService.countEvalutations();
  }

  @Get()
  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Evaluacion> {
    return this.evaluacionService.findOne(id);
  }

  @Post()
  async create(@Body() body: { data: Partial<Evaluacion>; idCombi: string }): Promise<Evaluacion> {
    const { data, idCombi } = body;
    return this.evaluacionService.create(data, idCombi);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Evaluacion>): Promise<Evaluacion> {
    return this.evaluacionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.evaluacionService.delete(id);
  }  

  @Get('getSheduleByIdCombi/:idChofer')
  async getSheduleByIdCombi(@Param('idChofer')idChofer:string):Promise<Evaluacion[]>{
    return await this.evaluacionService.getSheduleByIdCombi(idChofer);
  }
}