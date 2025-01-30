import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chofer } from './chofer.entity';

@Entity('ALERTA')
export class Alerta {
  @PrimaryGeneratedColumn('uuid')
  idAlerta: string;

  @Column({ length: 200 })
  descripcion: string;

  @Column('datetime')
  hora: Date;

  @ManyToOne(() => Chofer, (chofer) => chofer.alertas)
  @JoinColumn({ name: 'idChofer' })
  chofer: Chofer;
}
