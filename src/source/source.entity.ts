import { Commission } from 'src/commission/commission.entity';
import { ExchangeRate } from 'src/exchange-rate/exchange-rate.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Source {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '데이터 출처명' })
  name: string;

  @Column({ comment: '최대 환전 보관 한도 (달러)', nullable: true })
  maxLimit: number;

  @Column({ comment: '1일 최대 환전 한도 (달러)', nullable: true })
  maxLimitInOneDay: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  // 환율
  @OneToMany((type) => ExchangeRate, (exchangeRate) => exchangeRate.source)
  exchangeRates: ExchangeRate[];

  // 수수료
  @OneToMany((type) => Commission, (commission) => commission.source)
  commissions: Commission[];
}
