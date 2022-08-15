import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from './commission.entity';

@Module({ imports: [TypeOrmModule.forFeature([Commission])] })
export class CommissionModule {}
