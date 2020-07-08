import { injectable, inject } from 'tsyringe';

import IDebtsRepository from '../interfaces/IDebtsRepository';

import Debt from '../infra/database/entities/Debt';

@injectable()
class ListDebtsService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute(): Promise<Debt[]> {
    const debtsList = await this.debtsRepository.list();

    return debtsList;
  }
}

export default ListDebtsService;
