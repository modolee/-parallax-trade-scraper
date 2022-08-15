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
export class Commission {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '통화 종류' })
  currency: string;

  @Column({ comment: '현찰 살 때 스프레드 (%)' })
  buySpread: number;

  @Column({ comment: '현찰 살 때 우대율 (%)' })
  buyPreferentialRate: number;

  @Column({ comment: '현찰 팔 때 스프레드 (%)' })
  sellSpread: number;

  @Column({ comment: '현찰 팔 때 우대율 (%)' })
  sellPreferentialRate: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신일시' })
  updatedAt: Date;

  @ManyToOne((type) => Source, (source) => source.exchangeRates)
  source: Source;
}
