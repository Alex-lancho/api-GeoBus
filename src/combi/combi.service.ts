import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Combi } from '../entities/combi.entity';

@Injectable()
export class CombiService {
  constructor(
    @InjectRepository(Combi)
    private combiRepository: Repository<Combi>,
  ) {}

  async findAll(): Promise<Combi[]> {
    return this.combiRepository.find({ relations: ['chofer', 'horario', 'ubicaciones','rutas'] });
  }

  async findOne(id: string): Promise<Combi> {
    return this.combiRepository.findOne({ where: { idCombi: id }, relations: ['chofer', 'horario', 'ubicaciones','rutas'] });
  }

  async create(data: Partial<Combi>): Promise<Combi> {
    const combi = this.combiRepository.create(data);
    return this.combiRepository.save(combi);
  }
  

  async update(id: string, data: Partial<Combi>): Promise<Combi> {
    await this.combiRepository.update(id, data);
    return this.combiRepository.findOne({ where: { idCombi: id }, relations: ['chofer', 'horario', 'ubicaciones','rutas'] });
  }

  async delete(id: string): Promise<void> {
    await this.combiRepository.delete(id);
  }
}
