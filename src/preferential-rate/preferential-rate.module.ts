import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferentialRate } from './preferential-rate.entity';

@Module({ imports: [TypeOrmModule.forFeature([PreferentialRate])] })
export class PreferentialRateModule {}
