import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BankModule } from './bank/bank.module';
import { DatabaseModule } from './database/database.module';
import { InternationalExchangeRateModule } from './international-exchange-rate/international-exchange-rate.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { PreferentialRateModule } from './preferential-rate/preferential-rate.module';

@Module({
  imports: [
    DatabaseModule,
    BankModule,
    ExchangeRateModule,
    PreferentialRateModule,
    InternationalExchangeRateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
