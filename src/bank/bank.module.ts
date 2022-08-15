import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
})
export class BankModule {}
