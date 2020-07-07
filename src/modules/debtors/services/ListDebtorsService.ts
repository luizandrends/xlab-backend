import { injectable, inject } from 'tsyringe';

import IDebtorsRepository from '../interfaces/IDebtorsRepository';

import Debtor from '../infra/database/entities/Debtor';

@injectable()
class ListDebtorService {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute(): Promise<Debtor[]> {
    const debtorsList = await this.debtorsRepository.list();

    return debtorsList;
  }
}

export default ListDebtorService;
