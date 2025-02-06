import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from '../entities/alerta.entity';
import { Chofer } from 'src/entities/chofer.entity';

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

  async create(data: Partial<Alerta>,idChofer:string): Promise<Alerta> {
    const chofer = await this.choferRepository.findOne({ where: { idChofer } });
    if (!chofer) {
      throw new Error('La chofer especificada no existe');
    }
    
    const nuevaRuta = this.alertaRepository.create({
      ...data, 
      chofer,  
    });

    // Guarda la alerta en la base de datos
    return await this.alertaRepository.save(nuevaRuta);
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
}
