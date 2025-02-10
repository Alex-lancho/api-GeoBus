import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { Alerta } from '../entities/alerta.entity';

@Controller('alertas')
export class AlertaController {
  constructor(private readonly alertaService: AlertaService) {}

  @Get('total')
  async countAlerts(): Promise<number> {
    return this.alertaService.countAlerts();
  }

  @Get()
  findAll(): Promise<Alerta[]> {
    return this.alertaService.findAll();
  }  

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Alerta> {
    return this.alertaService.findOne(id);
  }

  @Post()
  async create(@Body() body: { data: Partial<Alerta>; idChofer: string }): Promise<Alerta> {
    const { data, idChofer } = body;
    return this.alertaService.create(data, idChofer);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Alerta>): Promise<Alerta> {
    return this.alertaService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.alertaService.delete(id);
  }

  @Get('listAlert/:idChofer')
  async obtenerRutasPorCombi(@Param('idChofer') idChofer: string): Promise<Alerta[]> {
      return this.alertaService.listByIdCombi(idChofer);
  }
  
}