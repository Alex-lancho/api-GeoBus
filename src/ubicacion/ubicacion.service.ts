import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from '../entities/ubicacion.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
  ) {}

  async findAll(): Promise<Ubicacion[]> {
    return this.ubicacionRepository.find({ relations: ['combi'] });
  }

  async findOne(id: number): Promise<Ubicacion> {
    return this.ubicacionRepository.findOne({ where: { idUbicacion: id }, relations: ['combi'] });
  }

  async create(data: Partial<Ubicacion>): Promise<Ubicacion> {
    const ubicacion = this.ubicacionRepository.create(data);
    return this.ubicacionRepository.save(ubicacion);
  }

  async update(id: number, data: Partial<Ubicacion>): Promise<Ubicacion> {
    await this.ubicacionRepository.update(id, data);
    return this.ubicacionRepository.findOne({ where: { idUbicacion: id }, relations: ['combi'] });
  }

  async delete(id: string): Promise<void> {
    await this.ubicacionRepository.delete(id);
  }
}
