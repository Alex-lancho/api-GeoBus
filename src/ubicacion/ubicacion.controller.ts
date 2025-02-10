import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { Ubicacion } from '../entities/ubicacion.entity';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get('total')
  async countLocation(): Promise<number> {
      return this.ubicacionService.countLocation();
  }

  @Get()
  findAll(): Promise<Ubicacion[]> {
    return this.ubicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ubicacion> {
    return this.ubicacionService.findOne(id);
  }

  @Get('obtenerUbicacionPorCombi/:idCombi')
  async obtenerUbicacionPorCombi(@Param('idCombi') idCombi: string): Promise<Ubicacion[]> {
    return this.ubicacionService.listByIdCombiUbicacion(idCombi);
  }

  @Post('createUbicacion')
  async create(@Body() body: { data: Partial<Ubicacion>; idCombi: string }): Promise<Ubicacion> {
    const { data, idCombi } = body;
    return this.ubicacionService.create(data, idCombi);
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