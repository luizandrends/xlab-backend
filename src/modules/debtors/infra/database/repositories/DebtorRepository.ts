import { getRepository, Repository } from 'typeorm';

import ICreateDebtorsDTO from '@modules/debtors/dtos/ICreateDebtorsDTO';
import IDebtorsRepository from '@modules/debtors/interfaces/IDebtorsRepository';
import Debtor from '../entities/Debtor';

class DebtorsRepository implements IDebtorsRepository {
  private ormRepository: Repository<Debtor>;

  constructor() {
    this.ormRepository = getRepository(Debtor);
  }

  public async findById(debtor_id: string): Promise<Debtor | undefined> {
    const findDebtor = this.ormRepository.findOne({
      where: { id: debtor_id },
    });

    return findDebtor;
  }

  public async findByEmail(email: string): Promise<Debtor | undefined> {
    const findDebtor = this.ormRepository.findOne({
      where: { email },
    });

    return findDebtor;
  }

  public async findByCpf(cpf: string): Promise<Debtor | undefined> {
    const findDebtor = this.ormRepository.findOne({
      where: { cpf },
    });

    return findDebtor;
  }

  public async create(debtorData: ICreateDebtorsDTO): Promise<Debtor> {
    const debtor = this.ormRepository.create(debtorData);

    await this.ormRepository.save(debtor);

    return debtor;
  }

  public async list(): Promise<Debtor[]> {
    const listDebtors = this.ormRepository.find();

    return listDebtors;
  }

  public async save(debtor: Debtor): Promise<Debtor> {
    return this.ormRepository.save(debtor);
  }
}

export default DebtorsRepository;
