import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { Ruta } from 'src/entities/ruta.entity';

@Controller('ruta')
export class RutaController {
    constructor(private readonly rutaService: RutaService) {}

    @Get()
    findAll(): Promise<Ruta[]> {
        return this.rutaService.findAll();
    }

    @Get()
    async getRutas(
        @Query('idUsuario') idUsuario: string,
        @Query('idCombi') idCombi: string,
    ) {
        return await this.rutaService.getRuta(idUsuario, idCombi);
    }
    
    @Post('createRuta')
    async crearRuta(@Body() body: { data: Partial<Ruta>; idCombi: string }): Promise<Ruta> {
        const { data, idCombi } = body; // Extrae los datos del body
        return this.rutaService.create(data, idCombi); // Llama al servicio para crear la ruta
    }
    
    @Get(':idCombi')
    async obtenerRutasPorCombi(@Param('idCombi') idCombi: string): Promise<Ruta[]> {
        return this.rutaService.listByIdCombi(idCombi);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<Ruta>): Promise<Ruta> {
        return this.rutaService.update(id, data);
    }
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
    return this.rutaService.delete(id);
    }
}
