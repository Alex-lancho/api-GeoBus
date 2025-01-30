import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { Horario } from 'src/entities/horario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Horario])],
  providers: [HorarioService],
  controllers: [HorarioController],
  exports:[HorarioService]
})
export class HorarioModule {}
