import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { Horario } from '../entities/horario.entity';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get('total')
  async countShedules(): Promise<number> {
    return this.horarioService.countShedules();
  }

  @Get()
  findAll(): Promise<Horario[]> {
    return this.horarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Horario> {
    return this.horarioService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Horario>): Promise<Horario> {
    return this.horarioService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Horario>): Promise<Horario> {
    return this.horarioService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.horarioService.delete(id);
  }  

  @Get('getSheduleByIdCombi/:idCombi')
  async getSheduleByIdCombi(@Param('idCombi') idCombi:string):Promise<Horario>{
    return this.horarioService.getSheduleByIdCombi(idCombi);
  }
}