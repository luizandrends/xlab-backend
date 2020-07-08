import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebtorsRepository from '@modules/debtors/interfaces/IDebtorsRepository';
import Debt from '../infra/database/entities/Debt';

import IDebtsRepository from '../interfaces/IDebtsRepository';

interface IRequest {
  debt_id: string;
  debtor_id: string;
  debt_reason: string;
  value: number;
}

@injectable()
class UpdateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({
    debt_id,
    debtor_id,
    debt_reason,
    value,
  }: IRequest): Promise<Debt> {
    const debt = await this.debtsRepository.findById(debt_id);
    const findDebtor = await this.debtorsRepository.findById(debtor_id);

    if (!debt) {
      throw new AppError('Unexistent debit', 400);
    }

    if (!findDebtor) {
      throw new AppError('Unexistent debtor', 400);
    }

    debt.debtor_id = debtor_id;
    debt.debt_reason = debt_reason;
    debt.value = value;

    return debt;
  }
}

export default UpdateDebtService;
