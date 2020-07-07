import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebtorsRepository from '../interfaces/IDebtorsRepository';

interface IRequest {
  debtor_id: string;
}

@injectable()
class DeleteDebtorService {
  constructor(
    @inject('UsersRepository')
    private debtorsRepository: IDebtorsRepository
  ) {}

  public async execute({ debtor_id }: IRequest): Promise<void> {
    const debtor = await this.debtorsRepository.findById(debtor_id);

    if (!debtor) {
      throw new AppError('Debtor not found', 400);
    }

    debtor.deleted_at = new Date();

    await this.debtorsRepository.save(debtor);
  }
}

export default DeleteDebtorService;
