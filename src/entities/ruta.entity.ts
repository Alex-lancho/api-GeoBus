import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Combi } from './combi.entity';

@Entity("RUTA")
export class Ruta {
    @PrimaryGeneratedColumn()
    idRuta: number;

    @Column({ type: 'decimal', precision: 20, scale: 15 })
    ejeX: number;

    @Column({ type: 'decimal', precision: 20, scale: 15 })
    ejeY: number;

    @Column({ length: 200})
    nombreLugar: string;

    @Column({ length: 200})
    paradero: string;

    @ManyToOne(() => Combi, (combi) => combi.rutas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idCombi' })
    combi: Combi;

}
