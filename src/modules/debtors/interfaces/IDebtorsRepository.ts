import Debtor from '../infra/database/entities/Debtor';

import ICreateDebtorsDTO from '../dtos/ICreateDebtorsDTO';

export default interface IDebtorsRepository {
  findById(debtor_id: string): Promise<Debtor | undefined>;
  findByEmail(email: string): Promise<Debtor | undefined>;
  findByCpf(cpf: string): Promise<Debtor | undefined>;
  findByName(debtor_name: string): Promise<(Debtor | undefined)[]>;
  create(debtorData: ICreateDebtorsDTO): Promise<Debtor>;
  list(): Promise<Debtor[]>;
  save(debtor: Debtor): Promise<Debtor>;
}
