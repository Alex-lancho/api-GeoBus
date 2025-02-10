import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from '../entities/alerta.entity';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';
import { Evaluacion } from 'src/entities/evaluacion.entity';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Alerta)
    private alertaRepository: Repository<Alerta>,
    @InjectRepository(Chofer)
    private choferRepository: Repository<Chofer>,
  ) {}

  async findAll(): Promise<Alerta[]> {
    return this.alertaRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Alerta> {
    return this.alertaRepository.findOne({ where: { idAlerta: id }, relations: ['chofer'] });
  }

  async create(data: Partial<Alerta>, idChofer: string): Promise<Alerta> {
    
    const chofer = await this.choferRepository.findOne({
      where: { idChofer },
    });

    if (!chofer) {
      throw new Error('El chofer no existe');
    }
    
    // Crea la alerta asignándole el chofer obtenido
    const nuevaAlerta = this.alertaRepository.create({
      ...data, 
      chofer: chofer, 
    });

    return await this.alertaRepository.save(nuevaAlerta);
  }

  async update(id: string, data: Partial<Alerta>): Promise<Alerta> {
    await this.alertaRepository.update(id, data);
    return this.alertaRepository.findOne({ where: { idAlerta: id } });
  }

  async delete(id: string): Promise<void> {
    await this.alertaRepository.delete(id);
  }

  async countAlerts(): Promise<number> {
    return await this.alertaRepository.count();
  }

  async listByIdCombi(idChofer: string): Promise<Alerta[]> {
    return this.alertaRepository
      .createQueryBuilder('alerta')
      .where('alerta.idChofer = :id', { id: idChofer })
      .getMany();
  }
}
