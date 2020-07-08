import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtsRepository from '../interfaces/IDebtsRepository';

import Debt from '../infra/database/entities/Debt';

interface IRequest {
  debt_id: string;
}

@injectable()
class ShowDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute({ debt_id }: IRequest): Promise<Debt | undefined> {
    const debt = await this.debtsRepository.findById(debt_id);

    if (!debt) {
      throw new AppError('Unexistent debt', 400);
    }

    return debt;
  }
}

export default ShowDebtService;
