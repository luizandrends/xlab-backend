import { inject, injectable } from 'tsyringe';
import { isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IDebtorsRepository from '@modules/debtors/interfaces/IDebtorsRepository';
import Debt from '../infra/database/entities/Debt';

import IDebtsRepository from '../interfaces/IDebtsRepository';

interface IRequest {
  debtor_id: string;
  debt_reason: string;
  date: Date;
  value: number;
}

@injectable()
class CreateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({
    debtor_id,
    debt_reason,
    date,
    value,
  }: IRequest): Promise<Debt> {
    const findDebtor = await this.debtorsRepository.findById(debtor_id);
    const findReason = await this.debtsRepository.findByReason(
      debt_reason,
      debtor_id
    );

    if (!findDebtor) {
      throw new AppError('Unexistent debtor', 400);
    }

    if (findReason) {
      throw new AppError(
        'You cannot create the same debt to the same debtor',
        400
      );
    }

    if (isBefore(date, Date.now())) {
      throw new AppError('You cannot create a past debt', 400);
    }

    const debt = await this.debtsRepository.create({
      debtor_id,
      debt_reason,
      date,
      value,
    });

    return debt;
  }
}

export default CreateDebtService;
