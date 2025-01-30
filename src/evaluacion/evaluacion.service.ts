import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from '../entities/evaluacion.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepository: Repository<Evaluacion>,
  ) {}

  async findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Evaluacion> {
    return this.evaluacionRepository.findOne({ where: { idEvaluacion: id }, relations: ['chofer'] });
  }

  async create(data: Partial<Evaluacion>): Promise<Evaluacion> {
    const evaluacion = this.evaluacionRepository.create(data);
    return this.evaluacionRepository.save(evaluacion);
  }

  async update(id: string, data: Partial<Evaluacion>): Promise<Evaluacion> {
    await this.evaluacionRepository.update(id, data);
    return this.evaluacionRepository.findOne({ where: { idEvaluacion: id }, relations: ['chofer'] });
  }

  async delete(id: number): Promise<void> {
    await this.evaluacionRepository.delete(id);
  }
}
