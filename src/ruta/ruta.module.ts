import { Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { Ruta } from 'src/entities/ruta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combi } from 'src/entities/combi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta,Combi])
  ],
  providers: [RutaService],
  controllers: [RutaController],
  exports: [RutaService],
})
export class RutaModule {}
