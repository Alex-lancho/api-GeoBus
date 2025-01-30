import { Module } from '@nestjs/common';
import { ChoferService } from './chofer.service';
import { ChoferController } from './chofer.controller';
import { Chofer } from 'src/entities/chofer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chofer])],
  providers: [ChoferService],
  controllers: [ChoferController],
  exports:[ChoferService],
})
export class ChoferModule {}
