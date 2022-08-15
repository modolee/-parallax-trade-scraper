import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SourceModule } from './source/source.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { CommissionModule } from './commission/commission.module';

@Module({
  imports: [DatabaseModule, CommissionModule, ExchangeRateModule, SourceModule],
  controllers: [AppController],
})
export class AppModule {}
