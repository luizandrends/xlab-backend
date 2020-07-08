import { Repository, getRepository } from 'typeorm';

import Debt from '@modules/debt/infra/database/entities/Debt';

import ICreateDebtDTO from '@modules/debt/dtos/ICreateDebtDTO';
import IDebtsRepository from '@modules/debt/interfaces/IDebtsRepository';

class FakeDebtsRepository implements IDebtsRepository {
  private ormRepository: Repository<Debt>;

  constructor() {
    this.ormRepository = getRepository(Debt);
  }

  public async findById(debt_id: string): Promise<Debt | undefined> {
    const findDebt = this.ormRepository.findOne({
      where: { id: debt_id },
      relations: ['debtor'],
    });

    return findDebt;
  }

  public async findByDebtor(debtor_id: string): Promise<Debt | undefined> {
    const findDebt = this.ormRepository.findOne({
      where: { debtor_id },
      relations: ['debtor'],
    });

    return findDebt;
  }

  public async findByReason(
    reason: string,
    debtor_id: string
  ): Promise<Debt | undefined> {
    const findDebt = this.ormRepository.findOne({
      where: { debt_reason: reason, debtor_id },
    });

    return findDebt;
  }

  public async create(data: ICreateDebtDTO): Promise<Debt> {
    const debt = this.ormRepository.create(data);

    await this.ormRepository.save(debt);

    return debt;
  }

  public async list(): Promise<Debt[]> {
    const listDebts = this.ormRepository.find({
      relations: ['debtor'],
    });

    return listDebts;
  }

  public async listByDebtor(debtor_id: string): Promise<Debt[]> {
    const listDebts = this.ormRepository.find({
      where: { debtor_id },
      relations: ['debtor'],
    });

    return listDebts;
  }

  public async save(debt: Debt): Promise<Debt> {
    return this.ormRepository.save(debt);
  }
}

export default FakeDebtsRepository;
