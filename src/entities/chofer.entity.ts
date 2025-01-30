import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Combi } from './combi.entity';
import { Usuario } from './usuario.entity';
import { Alerta } from './alerta.entity';
import { Evaluacion } from './evaluacion.entity';

@Entity('CHOFER')
export class Chofer {
  @PrimaryGeneratedColumn('uuid')
  idChofer: string;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 90 })
  apellidos: string;

  @Column({ length: 8 })
  dni: string;

  @OneToOne(() => Combi, (combi) => combi.chofer)
  @JoinColumn({ name: 'idCombi' })
  combi: Combi;

  @OneToOne(() => Usuario, (usuario) => usuario.chofer)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => Alerta, (alerta) => alerta.chofer)
  alertas: Alerta[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.chofer)
  evaluaciones: Evaluacion[];
}

