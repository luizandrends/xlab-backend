import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtorsRepository from '../interfaces/IDebtorsRepository';

import Debtor from '../infra/database/entities/Debtor';

interface IRequest {
  debtor_name: string;
}

@injectable()
class FindDebtorByName {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({
    debtor_name,
  }: IRequest): Promise<(Debtor | undefined)[]> {
    const findDebtor = await this.debtorsRepository.findByName(debtor_name);

    if (findDebtor.length === 0) {
      throw new AppError('Debtor not found', 400);
    }

    return findDebtor;
  }
}

export default FindDebtorByName;
