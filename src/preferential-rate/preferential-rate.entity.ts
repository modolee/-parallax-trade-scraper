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
export class PreferentialRate {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '통화 종류' })
  currency: string;

  @Column({ comment: '현찰 살 때 우대율 (%)' })
  buy: number;

  @Column({ comment: '현찰 팔 때 우대율 (%)' })
  sell: number;

  @Column({ comment: '송금 보낼 때 우대율 (%)' })
  transfer: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  @ManyToOne((type) => Bank, (bank) => bank.exchangeRates)
  bank: Bank;
}
