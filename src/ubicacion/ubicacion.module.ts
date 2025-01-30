import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { Ubicacion } from 'src/entities/ubicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion])],
  providers: [UbicacionService],
  controllers: [UbicacionController],
  exports:[UbicacionService]
})
export class UbicacionModule {}
