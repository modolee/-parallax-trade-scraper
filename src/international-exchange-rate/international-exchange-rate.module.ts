import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternationalExchangeRate } from './international-exchange-rate.entity';

@Module({ imports: [TypeOrmModule.forFeature([InternationalExchangeRate])] })
export class InternationalExchangeRateModule {}
