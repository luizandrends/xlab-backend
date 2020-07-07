import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    const findDebtorByEmail = await this.debtorsRepository.findByEmail(email);
    const findDebtorByCpf = await this.debtorsRepository.findByCpf(cpf);

    if (findDebtorByEmail) {
      throw new AppError('Debtor already registered by email', 400);
    }

    if (findDebtorByCpf) {
      throw new AppError('Debtor already registered by cpf', 400);
    }

    const debitor = await this.debtorsRepository.create({
      name,
      email,
      cpf,
    });

    return debitor;
  }
}

export default CreateDebtorService;
