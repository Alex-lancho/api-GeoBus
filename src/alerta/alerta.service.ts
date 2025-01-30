import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from '../entities/alerta.entity';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Alerta)
    private alertaRepository: Repository<Alerta>,
  ) {}

  async findAll(): Promise<Alerta[]> {
    return this.alertaRepository.find({ relations: ['chofer'] });
  }

  async findOne(id: string): Promise<Alerta> {
    return this.alertaRepository.findOne({ where: { idAlerta: id }, relations: ['chofer'] });
  }

  async create(data: Partial<Alerta>): Promise<Alerta> {
    const alerta = this.alertaRepository.create(data);
    return this.alertaRepository.save(alerta);
  }

  async update(id: string, data: Partial<Alerta>): Promise<Alerta> {
    await this.alertaRepository.update(id, data);
    return this.alertaRepository.findOne({ where: { idAlerta: id } });
  }

  async delete(id: string): Promise<void> {
    await this.alertaRepository.delete(id);
  }
}
