import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';
import { Horario } from 'src/entities/horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Chofer, Combi, Horario])], // Asegúrate de registrar aquí la entidad
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService], // Exporta si necesitas usar este servicio en otros módulos
})
export class UsuarioModule {}

