import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('debts')
class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  debtor_id: string;

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
