import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Chofer } from './chofer.entity';
import { Horario } from './horario.entity';
import { Ubicacion } from './ubicacion.entity';
import { Ruta } from './ruta.entity';

@Entity("COMBI")
export class Combi {
  @PrimaryGeneratedColumn('uuid')
  idCombi: string;

  @Column({ length: 45 })
  placa: string;

  @Column({ length: 45 })
  modelo: string;

  @Column({ length: 45 })
  linea: string;

  @OneToOne(() => Chofer, (chofer) => chofer.combi)
  chofer: Chofer;

  @OneToOne(() => Horario, (horario) => horario.combi)
  horario: Horario;

  @OneToMany(() => Ruta, (ruta) => ruta.combi)
  rutas: Ruta[];

  @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.combi)
  ubicaciones: Ubicacion[];
}