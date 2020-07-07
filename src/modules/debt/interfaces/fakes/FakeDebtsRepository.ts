import { uuid } from 'uuidv4';

import Debt from '@modules/debt/infra/database/entities/Debt';

import ICreateDebtDTO from '@modules/debt/dtos/ICreateDebtDTO';
import IDebtsRepository from '../IDebtsRepository';

class FakeDebtsRepository implements IDebtsRepository {
  private debts: Debt[] = [];

  public async findById(debt_id: string): Promise<Debt | undefined> {
    const findDebt = this.debts.find(debt => debt.id === debt_id);

    return findDebt;
  }

  public async findByDebtor(debtor_id: string): Promise<Debt | undefined> {
    const findDebt = this.debts.find(debt => debt.debtor_id === debtor_id);

    return findDebt;
  }

  public async findByReason(reason: string): Promise<Debt | undefined> {
    const findDebt = this.debts.find(debt => debt.debt_reason === reason);

    return findDebt;
  }

  public async create(data: ICreateDebtDTO): Promise<Debt> {
    const debt = new Debt();

    Object.assign(debt, { id: uuid() }, data);

    this.debts.push(debt);

    return debt;
  }

  public async listDebts(): Promise<Debt[]> {
    const listDebts = this.debts.map(debt => {
      return debt;
    });

    return listDebts;
  }

  public async save(debt: Debt): Promise<Debt> {
    const findIndex = this.debts.findIndex(findDebt => findDebt.id === debt.id);

    this.debts[findIndex] = debt;

    return debt;
  }
}

export default FakeDebtsRepository;
