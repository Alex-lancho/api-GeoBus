import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Combi } from './combi.entity';

@Entity("HORARIO")
export class Horario {
  @PrimaryGeneratedColumn('uuid')
  idHorario: string;

  @Column({ length: 45 })
  horaPartida: string;

  @Column({ length: 45 })
  horaLlegada: string;

  @Column({ length: 45 })
  tiempoLlegada: string;

  @OneToOne(() => Combi, (combi) => combi.horario)
  @JoinColumn({ name: 'idCombi' })
  combi: Combi;
}