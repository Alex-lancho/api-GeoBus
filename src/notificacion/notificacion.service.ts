// src/notificacion/notificacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from '../entities/notificacion.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
  ) {}

  async findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find();
  }

  async findOne(id: string): Promise<Notificacion> {
    return this.notificacionRepository.findOne({ where: { idNotificacion: id } });
  }

  async create(data: Partial<Notificacion>): Promise<Notificacion> {
    const notificacion = this.notificacionRepository.create(data);
    return this.notificacionRepository.save(notificacion);
  }

  async update(id: string, data: Partial<Notificacion>): Promise<Notificacion> {
    await this.notificacionRepository.update(id, data);
    return this.notificacionRepository.findOne({ where: { idNotificacion: id } });
  }

  async delete(id: string): Promise<void> {
    await this.notificacionRepository.delete(id);
  }
}
