import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from '../entities/evaluacion.entity';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Chofer)
    private choferRepository: Repository<Chofer>,
    @InjectRepository(Combi)
    private combiRepository: Repository<Combi>,
  ) {}

  async findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Evaluacion> {
    return this.evaluacionRepository.findOne({ where: { idEvaluacion: id }, relations: ['chofer'] });
  }

 // Modificación: Recibe idCombi en lugar de idChofer.
 async create(data: Partial<Evaluacion>, idCombi: string): Promise<Evaluacion> {
  // Busca la combi por id, incluyendo la relación con chofer.
  const combi = await this.combiRepository.findOne({
    where: { idCombi },
    relations: ['chofer'],
  });
  if (!combi || !combi.chofer) {
    throw new Error('La combi no existe o no tiene chofer asignado');
  }

  // Crea la evaluación asignándole el chofer obtenido de la combi.
  const nuevaEvaluacion = this.evaluacionRepository.create({
    ...data,
    chofer: combi.chofer,
  });

  return await this.evaluacionRepository.save(nuevaEvaluacion);
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

  async getSheduleByIdCombi(idChofer: string): Promise<Evaluacion[]> {
    return await this.evaluacionRepository.find({
        where: { chofer: { idChofer } },
        relations: ['chofer'], 
    });
  }
}
