import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { Ubicacion } from '../entities/ubicacion.entity';

@Controller('ubicaciones')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get()
  findAll(): Promise<Ubicacion[]> {
    return this.ubicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ubicacion> {
    return this.ubicacionService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Ubicacion>): Promise<Ubicacion> {
    return this.ubicacionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Ubicacion>): Promise<Ubicacion> {
    return this.ubicacionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ubicacionService.delete(id);
  }
}