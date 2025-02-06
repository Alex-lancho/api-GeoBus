import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Combi } from 'src/entities/combi.entity';
import { Ruta } from 'src/entities/ruta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
    @InjectRepository(Combi)
    private combiRepository: Repository<Combi>,
  ) {}
  async findAll(): Promise<Ruta[]> {
    return this.rutaRepository.find({ relations: ['combi'] });
  }

  async getRuta(idUsuario: string, idCombi: string): Promise<any> {
    return await this.rutaRepository
      .createQueryBuilder('r') // Alias principal es 'r' para Ruta
      .innerJoin('r.combi', 'c') // Relación entre Ruta y Combi
      .innerJoin('c.chofer', 'ch') // Relación entre Combi y Chofer      
      .select([
        'ch.nombre as nombre', 
        'ch.apellidos as apellidos', 
        'c.idCombi as idCombi', 
        'c.linea as linea', 
        'c.modelo as modelo', 
        'r.ejeX as ejeX', 
        'r.ejeY as ejeY', 
        'r.nombreLugar as nombreLugar', 
        'r.paradero as paradero'
      ])
      .where('ch.idUsuario = :idUsuario', { idUsuario }) // Filtro por idChofer
      .andWhere('c.idCombi = :idCombi', { idCombi }) // Filtro por idCombi
      .getRawMany();
  }

  async create(data: Partial<Ruta>,idCombi:string): Promise<Ruta> {
    const combi = await this.combiRepository.findOne({ where: { idCombi } });
    if (!combi) {
      throw new Error('La combi especificada no existe');
    }

    // Crea la nueva ruta y la asocia a la combi
    const nuevaRuta = this.rutaRepository.create({
      ...data, // Asigna los datos de la ruta (ejeX, ejeY, etc.)
      combi,   // Relaciona con la combi encontrada
    });

    // Guarda la ruta en la base de datos
    return await this.rutaRepository.save(nuevaRuta);
  }

  async listByIdCombi(idCombi: string): Promise<Ruta[]> {
    return this.rutaRepository
      .createQueryBuilder('ruta')
      .where('ruta.idCombi = :id', { id: idCombi })
      .getMany();
  }

  async update(id: number, data: Partial<Ruta>): Promise<Ruta> {
    await this.rutaRepository.update(id, data);
    return this.rutaRepository.findOne({ where: { idRuta: id }, relations: ['combi'] });
  }

  async delete(id: number): Promise<void> {
    await this.rutaRepository.delete(id);
  }

  async countRoute(): Promise<number> {
    return await this.rutaRepository.count();
  }
}
