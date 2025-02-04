import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Chofer } from './entities/chofer.entity';
import { Alerta } from './entities/alerta.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ChoferModule } from './chofer/chofer.module';
import { AlertaModule } from './alerta/alerta.module';
import { AppController } from './app.controller';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { CombiModule } from './combi/combi.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { HorarioModule } from './horario/horario.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { Combi } from './entities/combi.entity';
import { Evaluacion } from './entities/evaluacion.entity';
import { Horario } from './entities/horario.entity';
import { Notificacion } from './entities/notificacion.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Ruta } from './entities/ruta.entity';
import { RutaModule } from './ruta/ruta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'bdruta',
      entities: [Usuario, Chofer, Alerta,Combi,Evaluacion,Horario,Notificacion,Ubicacion,Ruta],
      synchronize: true, // Usar solo en desarrollo
      //logging: ['query', 'error'],
    }),
    TypeOrmModule.forFeature([Usuario, Chofer, Alerta,Combi,Evaluacion,Horario,Notificacion,Ubicacion,Ruta]),
    UsuarioModule,
    ChoferModule,
    AlertaModule,
    EvaluacionModule,
    CombiModule,
    UbicacionModule,
    HorarioModule,
    NotificacionModule,
    RutaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
