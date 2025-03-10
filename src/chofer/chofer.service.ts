import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chofer } from '../entities/chofer.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class ChoferService {
  constructor(
    @InjectRepository(Chofer)
    private choferRepository: Repository<Chofer>,
    @InjectRepository(Chofer)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Chofer[]> {
    return this.choferRepository.find({ relations: ['combi', 'usuario', 'alertas', 'evaluaciones'] });
  }

  async findOne(id: string): Promise<Chofer> {
    return this.choferRepository.findOne({ where: { idChofer: id }, relations: ['combi', 'usuario', 'alertas', 'evaluaciones'] });
  }

  async create(data: Partial<Chofer>): Promise<Chofer> {
    const chofer = this.choferRepository.create(data);
    return this.choferRepository.save(chofer);
  }

  async update(id: string, data: Partial<Chofer>): Promise<Chofer> {
    await this.choferRepository.update(id, data);
    return this.choferRepository.findOne({ where: { idChofer: id }, relations: ['combi', 'usuario', 'alertas', 'evaluaciones'] });
  }

  async delete(id: string): Promise<void> {
    await this.choferRepository.delete(id);
  }
  async countDravers(): Promise<number> {
    return await this.choferRepository.count();
  }
}
