import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';
import { Horario } from 'src/entities/horario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Chofer)
    private choferRepository:Repository<Chofer>,
    @InjectRepository(Combi)
    private readonly combiRepository: Repository<Combi>,
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['chofer'] });
  }

  async findOne(usuario: string, contraseña: string): Promise<any | null> {
    try {
      // Buscar al usuario por nombre de usuario
      const user = await this.usuarioRepository.findOne({
        where: { usuario },
      });
  
      if (!user) {
        console.error('Usuario no encontrado');
        return null;
      }
  
      // Validar la contraseña
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        console.error('Contraseña incorrecta');
        return null;
      }
  
      // Consulta personalizada para obtener los datos necesarios
      const queryResult = await this.usuarioRepository.query(
        `
        SELECT 
          c.idChofer, cb.idCombi, u.usuario, u.tipo, 
          c.nombre, c.apellidos, c.dni, cb.placa, 
          cb.modelo, cb.linea, h.horaPartida, 
          h.horaLlegada, h.tiempoLlegada
        FROM USUARIO u
        INNER JOIN CHOFER c ON c.idUsuario = u.idUsuario
        INNER JOIN COMBI cb ON cb.idCombi = c.idCombi
        INNER JOIN HORARIO h ON h.idCombi = cb.idCombi
        WHERE u.usuario = ?
      `,
        [usuario], // Reemplaza el marcador de posición "?" con el valor del usuario
      );
  
      if (queryResult.length === 0) {
        console.error('Datos no encontrados');
        return null;
      }
  
      return queryResult[0];
    } catch (error) {
      console.error('Error en la autenticación:', error);
      throw new Error('Error en la autenticación');
    }
  }
  

  async createUser(data: Partial<Usuario>): Promise<Usuario> {
    try {
      // Validar que los campos requeridos están presentes
      if (!data.usuario || !data.contraseña) {
        throw new Error('El usuario y la contraseña son requeridos');
      }

      // Encriptar solo la contraseña
      const saltRounds = 10;
      data.contraseña = await bcrypt.hash(data.contraseña, saltRounds);

      // Crear y guardar el usuario
      const user = this.usuarioRepository.create(data);
      return await this.usuarioRepository.save(user);
    } catch (error) {
      throw new Error('No se pudo crear el usuario');
    }
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    try {
      if (data.contraseña) {
        data.contraseña = await bcrypt.hash(data.contraseña, 10);
      }

      await this.usuarioRepository.update(id, data);
      return this.usuarioRepository.findOne({ where: { idUsuario: id }, relations: ['chofer'] });
    } catch (error) {
      throw new Error('No se pudo actualizar el usuario');
    }
  }

  async delete(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async crearDatos(data: Record<string, any>): Promise<any> {
    const { usuario, combi, chofer, horario } = data;
  
    try {
      // Crear Usuario    
      usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
      const nuevoUsuario = this.usuarioRepository.create(usuario);
      const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
  
      // Crear Combi
      const nuevaCombi = this.combiRepository.create(combi);
      const combiGuardada = await this.combiRepository.save(nuevaCombi);
  
      // Crear Chofer relacionado con Usuario y Combi
      const nuevoChofer = this.choferRepository.create({
        ...chofer,
        usuario: usuarioGuardado, // Relación con Usuario
        combi: combiGuardada, // Relación con Combi
      });
      const choferGuardado = await this.choferRepository.save(nuevoChofer);
  
      // Crear Horario relacionado con Combi
      const nuevoHorario = this.horarioRepository.create({
        ...horario,
        combi: combiGuardada, // Relación con Combi
      });
      const horarioGuardado = await this.horarioRepository.save(nuevoHorario);
  
      // Retornar todos los datos insertados
      return {
        usuario: usuarioGuardado,
        combi: combiGuardada,
        chofer: choferGuardado,
        horario: horarioGuardado,
      };
    } catch (error) {
      throw new Error(`Error al insertar datos: ${error.message}`);
    }
  }
  
}
