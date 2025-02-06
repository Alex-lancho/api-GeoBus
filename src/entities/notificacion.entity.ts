import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity("NOTIFICACION")
export class Notificacion {
  @PrimaryGeneratedColumn('uuid')
  idNotificacion: string;

  @Column({ length: 45 })
  tipo: string;

  @Column({ length: 250 })
  descripcion: string;

  @Column({ length: 45 })
  nombreCompleto: string;

  @Column({ length: 250 })
  dni: string;
}