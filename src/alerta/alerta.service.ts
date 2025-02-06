import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from '../entities/alerta.entity';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Alerta)
    private alertaRepository: Repository<Alerta>,
    @InjectRepository(Combi)
    private combiRepository: Repository<Combi>,
  ) {}

  async findAll(): Promise<Alerta[]> {
    return this.alertaRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Alerta> {
    return this.alertaRepository.findOne({ where: { idAlerta: id }, relations: ['chofer'] });
  }

  async create(data: Partial<Alerta>, idCombi: string): Promise<Alerta> {
    // Busca la combi por id, incluyendo la relación con el chofer
    const combi = await this.combiRepository.findOne({
      where: { idCombi },
      relations: ['chofer'],
    });
    if (!combi || !combi.chofer) {
      throw new Error('La combi no existe o no tiene chofer asignado');
    }
    
    // Crea la alerta asignándole el chofer obtenido a partir de la combi
    const nuevaAlerta = this.alertaRepository.create({
      ...data, 
      chofer: combi.chofer,  
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
}
