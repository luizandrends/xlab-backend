import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtorsRepository from '../interfaces/IDebtorsRepository';

import Debtor from '../infra/database/entities/Debtor';

interface IRequest {
  debtor_id: string;
}

@injectable()
class ShowDebtorService {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({ debtor_id }: IRequest): Promise<Debtor> {
    const findDebtor = await this.debtorsRepository.findById(debtor_id);

    if (!findDebtor) {
      throw new AppError('Unexistent debtor', 400);
    }

    return findDebtor;
  }
}

export default ShowDebtorService;
