import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Chofer } from './chofer.entity';

@Entity('USUARIO')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @Column({ type: 'varchar', length: 45 })
  tipo: string;

  @Column({ type: 'varchar', length: 80 })
  usuario: string;

  @Column({ type: 'varchar', length: 80 })
  contraseña: string;

  @OneToOne(() => Chofer, (chofer) => chofer.usuario)
  chofer: Chofer;
}
