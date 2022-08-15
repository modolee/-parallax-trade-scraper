import { Source } from 'src/source/source.entity';
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

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  @ManyToOne((type) => Source, (source) => source.exchangeRates)
  source: Source;
}
