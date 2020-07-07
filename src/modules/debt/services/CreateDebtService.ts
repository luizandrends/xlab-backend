import { inject, injectable } from 'tsyringe';

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
    @inject('DebtRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute({
    debtor_id,
    debt_reason,
    date,
    value,
  }: IRequest): Promise<Debt> {
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
