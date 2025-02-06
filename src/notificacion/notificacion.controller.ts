import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from '../entities/notificacion.entity';

@Controller('notificaciones')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Get()
  findAll(): Promise<Notificacion[]> {
    return this.notificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notificacion> {
    return this.notificacionService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Notificacion>): Promise<Notificacion> {
    return this.notificacionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Notificacion>): Promise<Notificacion> {
    return this.notificacionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.notificacionService.delete(id);
  }

  @Get('count')
  async countNotification(): Promise<number> {
    return this.notificacionService.countNotification();
  }
}