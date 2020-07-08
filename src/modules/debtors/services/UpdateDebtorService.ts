import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDebtorsRepository from '../interfaces/IDebtorsRepository';

import Debtor from '../infra/database/entities/Debtor';

interface IRequest {
  debtor_id: string;
  name: string;
  email: string;
  cpf: string;
}

@injectable()
class UpdateDebtorService {
  constructor(
    @inject('DebtorsRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({
    debtor_id,
    name,
    email,
    cpf,
  }: IRequest): Promise<Debtor> {
    const debtor = await this.debtorsRepository.findById(debtor_id);
    const findDebtorByEmail = await this.debtorsRepository.findByEmail(email);
    const findDebtorByCpf = await this.debtorsRepository.findByCpf(cpf);

    if (!debtor) {
      throw new AppError('Unexistent debtor', 400);
    }

    if (findDebtorByEmail) {
      throw new AppError('Email already registered', 400);
    }

    if (findDebtorByCpf) {
      throw new AppError('Cpf already registered', 400);
    }

    debtor.name = name;
    debtor.email = email;
    debtor.cpf = cpf;

    await this.debtorsRepository.save(debtor);

    return debtor;
  }
}

export default UpdateDebtorService;
