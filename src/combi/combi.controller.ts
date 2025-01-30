import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CombiService } from './combi.service';
import { Combi } from '../entities/combi.entity';

@Controller('combis')
export class CombiController {
  constructor(private readonly combiService: CombiService) {}

  @Get()
  findAll(): Promise<Combi[]> {
    return this.combiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Combi> {
    return this.combiService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Combi>): Promise<Combi> {
    return this.combiService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Combi>): Promise<Combi> {
    return this.combiService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.combiService.delete(id);
  }
}