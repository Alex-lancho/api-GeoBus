import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';
import { Alerta } from 'src/entities/alerta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chofer } from 'src/entities/chofer.entity';
import { Combi } from 'src/entities/combi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta,Combi])],
  providers: [AlertaService],
  controllers: [AlertaController],
  exports:[AlertaService]
})
export class AlertaModule {}
