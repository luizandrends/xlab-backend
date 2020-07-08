import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtorsRepository from '@modules/debtors/interfaces/IDebtorsRepository';
import IDebtsRepository from '../interfaces/IDebtsRepository';

import Debt from '../infra/database/entities/Debt';

interface IRequest {
  debtor_id: string;
}

@injectable()
class ListDebtorsDebtsService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({ debtor_id }: IRequest): Promise<Debt[]> {
    const findDebtor = await this.debtorsRepository.findById(debtor_id);

    if (!findDebtor) {
      throw new AppError('Unexistent debtor', 400);
    }

    const debtsList = await this.debtsRepository.listByDebtor(debtor_id);

    return debtsList;
  }
}

export default ListDebtorsDebtsService;
