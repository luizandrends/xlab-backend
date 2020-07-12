import { uuid } from 'uuidv4';

import ICreateDebtorsDTO from '@modules/debtors/dtos/ICreateDebtorsDTO';
import Debtor from '../../infra/database/entities/Debtor';

import IDebtorsRepository from '../IDebtorsRepository';

class FakeDebtorsRepository implements IDebtorsRepository {
  private debtors: Debtor[] = [];

  public async findById(debtor_id: string): Promise<Debtor | undefined> {
    const findDebtor = this.debtors.find(debtor => debtor.id === debtor_id);

    return findDebtor;
  }

  public async findByEmail(email: string): Promise<Debtor | undefined> {
    const findDebtor = this.debtors.find(debtor => debtor.email === email);

    return findDebtor;
  }

  public async findByCpf(cpf: string): Promise<Debtor | undefined> {
    const findDebtor = this.debtors.find(debtor => debtor.cpf === cpf);

    return findDebtor;
  }

  public async findByName(name: string): Promise<(Debtor | undefined)[]> {
    const listDebtorByName = this.debtors.map(debtor => {
      return debtor.name === name ? debtor : undefined;
    });

    return listDebtorByName;
  }

  public async create(debtorData: ICreateDebtorsDTO): Promise<Debtor> {
    const debtor = new Debtor();

    Object.assign(debtor, { id: uuid() }, debtorData);

    this.debtors.push(debtor);

    return debtor;
  }

  public async list(): Promise<Debtor[]> {
    const listDebtors = this.debtors.map(debtor => {
      return debtor;
    });

    return listDebtors;
  }

  public async save(debtor: Debtor): Promise<Debtor> {
    const findIndex = this.debtors.findIndex(
      findDebtor => findDebtor.id === debtor.id
    );

    this.debtors[findIndex] = debtor;

    return debtor;
  }
}

export default FakeDebtorsRepository;
