import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtsRepository from '../interfaces/IDebtsRepository';

interface IRequest {
  debt_id: string;
}

@injectable()
class DeleteDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute({ debt_id }: IRequest): Promise<void> {
    const debt = await this.debtsRepository.findById(debt_id);

    if (!debt) {
      throw new AppError('Debtor not found', 400);
    }

    debt.deleted_at = new Date();

    await this.debtsRepository.save(debt);
  }
}

export default DeleteDebtService;
