import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Debtor from '@modules/debtors/infra/database/entities/Debtor';

@Entity('debts')
class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  debtor_id: string;

  @ManyToOne(() => Debtor)
  @JoinColumn({ name: 'debtor_id' })
  debtor: Debtor;

  @Column()
  debt_reason: string;

  @Column()
  date: Date;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Debt;
