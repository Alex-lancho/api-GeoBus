import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from '../entities/ubicacion.entity';
import { Combi } from 'src/entities/combi.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Combi)
    private combiRepository: Repository<Combi>,
  ) {}

  async findAll(): Promise<Ubicacion[]> {
    return this.ubicacionRepository.find({ relations: ['combi'] });
  }

  async findOne(id: number): Promise<Ubicacion> {
    return this.ubicacionRepository.findOne({ where: { idUbicacion: id }, relations: ['combi'] });
  }

  async create(data: Partial<Ubicacion>, idCombi:string): Promise<Ubicacion> {
    const combi = await this.combiRepository.findOne({ where: { idCombi } });
    if (!combi) {
      throw new Error('La combi especificada no existe');
    }

    // Crea la nueva ruta y la asocia a la combi
    const nuevaRuta = this.ubicacionRepository.create({
      ...data, // Asigna los datos de la ruta (ejeX, ejeY, etc.)
      combi,   // Relaciona con la combi encontrada
    });

    // Guarda la ruta en la base de datos
    return await this.ubicacionRepository.save(nuevaRuta);
  }

  async update(id: number, data: Partial<Ubicacion>): Promise<Ubicacion> {
    await this.ubicacionRepository.update(id, data);
    return this.ubicacionRepository.findOne({ where: { idUbicacion: id }, relations: ['combi'] });
  }

  async delete(id: string): Promise<void> {
    await this.ubicacionRepository.delete(id);
  }

  async listByIdCombiUbicacion(idCombi: string): Promise<Ubicacion[]> {
    return this.ubicacionRepository.findBy({ combi: { idCombi } });
  }
}
