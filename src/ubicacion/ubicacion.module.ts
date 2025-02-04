import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { Ubicacion } from 'src/entities/ubicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combi } from 'src/entities/combi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion,Combi])],
  providers: [UbicacionService],
  controllers: [UbicacionController],
  exports:[UbicacionService]
})
export class UbicacionModule {}
