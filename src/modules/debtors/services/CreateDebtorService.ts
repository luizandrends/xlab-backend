import { injectable, inject } from 'tsyringe';

import IDebtorsRepository from '../interfaces/IDebtorsRepository';

import Debitor from '../infra/database/Debtor';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
}

@injectable()
class CreateDebtorService {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({ name, email, cpf }: IRequest): Promise<Debitor> {
    const debitor = await this.debtorsRepository.create({
      name,
      email,
      cpf,
    });

    return debitor;
  }
}

export default CreateDebtorService;
