import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from '../entities/evaluacion.entity';
import { Chofer } from 'src/entities/chofer.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Chofer)
    private choferRepository: Repository<Chofer>,
  ) {}

  async findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Evaluacion> {
    return this.evaluacionRepository.findOne({ where: { idEvaluacion: id }, relations: ['chofer'] });
  }

  async create(data: Partial<Evaluacion>,idChofer:string): Promise<Evaluacion> {
    const chofer = await this.choferRepository.findOne({ where: { idChofer } });
    if (!chofer) {
      throw new Error('La chofer especificada no existe');
    }
    
    const nuevaRuta = this.evaluacionRepository.create({
      ...data, 
      chofer,  
    });

    // Guarda la ruta en la base de datos
    return await this.evaluacionRepository.save(nuevaRuta);
  }

  async update(id: string, data: Partial<Evaluacion>): Promise<Evaluacion> {
    await this.evaluacionRepository.update(id, data);
    return this.evaluacionRepository.findOne({ where: { idEvaluacion: id }, relations: ['chofer'] });
  }

  async delete(id: number): Promise<void> {
    await this.evaluacionRepository.delete(id);
  }

  async countEvalutations(): Promise<number> {
    return await this.evaluacionRepository.count();
  }
}
