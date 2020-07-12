import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtsRepository from '../interfaces/IDebtsRepository';

import Debt from '../infra/database/entities/Debt';

interface IRequest {
  debt_reason: string;
}

@injectable()
class ShowDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute({
    debt_reason,
  }: IRequest): Promise<(Debt | undefined)[]> {
    const debts = await this.debtsRepository.findByReasonName(debt_reason);

    if (debts.length === 0) {
      throw new AppError('Debt not found', 400);
    }

    return debts;
  }
}

export default ShowDebtService;
