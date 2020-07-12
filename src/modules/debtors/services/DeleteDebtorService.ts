import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtsRepository from '@modules/debt/interfaces/IDebtsRepository';
import IDebtorsRepository from '../interfaces/IDebtorsRepository';

interface IRequest {
  debtor_id: string;
}

@injectable()
class DeleteDebtorService {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository,

    @inject('DebtsRepository')
    private debtsReopository: IDebtsRepository
  ) {}

  public async execute({ debtor_id }: IRequest): Promise<void> {
    const debtor = await this.debtorsRepository.findById(debtor_id);

    if (!debtor) {
      throw new AppError('Debtor not found', 400);
    }

    const findDebts = await this.debtsReopository.findByDebtor(debtor_id);

    if (findDebts) {
      throw new AppError(
        'You cannot delete an debtor with debts in active',
        400
      );
    }
    debtor.deleted_at = new Date();

    await this.debtorsRepository.save(debtor);
  }
}

export default DeleteDebtorService;
