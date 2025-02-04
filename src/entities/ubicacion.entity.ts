import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Combi } from './combi.entity';

@Entity("UBICACION")
export class Ubicacion {
  @PrimaryGeneratedColumn()
  idUbicacion: number;

  @Column({ type: 'decimal', precision: 20, scale: 15 })
  ejeX: number;

  @Column({ type: 'decimal', precision: 20, scale: 15 })
  ejeY: number;

  @Column({ length: 150 })
  nombreLugar: string;

  @Column('time')
  tiempoTranscurrido: string;

  @ManyToOne(() => Combi, (combi) => combi.ubicaciones, {eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCombi' })
  combi: Combi;
}