import { Bank } from 'src/bank/bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '통화 종류' })
  currency: string;

  @Column({ comment: '매매기준율 (원)' })
  basePrice: number;

  @Column({ comment: '현찰 살 때 스프레드 (%)' })
  buySpread: number;

  @Column({ comment: '현찰 팔 때 스프레드 (%)' })
  sellSpread: number;

  @Column({ comment: '송금 보낼 때 스프레드 (%)' })
  transferSpread: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  @ManyToOne((type) => Bank, (bank) => bank.exchangeRates)
  bank: Bank;
}
