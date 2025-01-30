import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chofer } from './chofer.entity';

@Entity("EVALUACION")
export class Evaluacion {
  @PrimaryGeneratedColumn('uuid')
  idEvaluacion: string;

  @Column({ length: 45 })
  puntualidad: string;

  @Column({ length: 45 })
  comodidad: string;

  @Column({ length: 45 })
  fecha: string;

  @Column({ length: 300 })
  descripcion: string;

  @ManyToOne(() => Chofer, (chofer) => chofer.evaluaciones)
  @JoinColumn({ name: 'idChofer' })
  chofer: Chofer;
}