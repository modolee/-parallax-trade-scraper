import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './exchange-rate.entity';

@Module({ imports: [TypeOrmModule.forFeature([ExchangeRate])] })
export class ExchangeRateModule {}
