import { ExchangeRate } from 'src/exchange-rate/exchange-rate.entity';
import { PreferentialRate } from 'src/preferential-rate/preferential-rate.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '은행명' })
  name: string;

  @Column({ comment: '최대 환전 보관 한도 (달러)' })
  maxLimit: number;

  @Column({ comment: '1일 최대 환전 한도 (달러)' })
  maxLimitInOneDay: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  @OneToMany((type) => ExchangeRate, (exchangeRate) => exchangeRate.bank)
  exchangeRates: ExchangeRate[];

  @OneToMany(
    (type) => PreferentialRate,
    (preferentialRate) => preferentialRate.bank,
  )
  preferentialRates: PreferentialRate[];
}
