import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horario } from '../entities/horario.entity';
import { Combi } from 'src/entities/combi.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private horarioRepository: Repository<Horario>,
  ) {}

  async findAll(): Promise<Horario[]> {
    return this.horarioRepository.find({ relations: ['combi'] });
  }

  async findOne(id: string): Promise<Horario> {
    return this.horarioRepository.findOne({ where: { idHorario: id }, relations: ['combi'] });
  }

  async create(data: Partial<Horario>): Promise<Horario> {
    const horario = this.horarioRepository.create(data);
    return this.horarioRepository.save(horario);
  }

  async update(id: string, data: Partial<Horario>): Promise<Horario> {
    await this.horarioRepository.update(id, data);
    return this.horarioRepository.findOne({ where: { idHorario: id }, relations: ['combi'] });
  }

  async delete(id: string): Promise<void> {
    await this.horarioRepository.delete(id);
  }

  async countShedules(): Promise<number> {
    return await this.horarioRepository.count();
  }

  async getSheduleByIdCombi(idCombi: string): Promise<Horario> {
    return this.horarioRepository.findOneBy({ combi: { idCombi } });
  }
}
