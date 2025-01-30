import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChoferService } from './chofer.service';
import { Chofer } from '../entities/chofer.entity';

@Controller('choferes')
export class ChoferController {
  constructor(private readonly choferService: ChoferService) {}

  @Get()
  findAll(): Promise<Chofer[]> {
    return this.choferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Chofer> {
    return this.choferService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Chofer>): Promise<Chofer> {
    return this.choferService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Chofer>): Promise<Chofer> {
    return this.choferService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.choferService.delete(id);
  }
}