import Debtor from '../infra/database/Debtor';

import ICreateDebtorsDTO from '../dtos/ICreateDebtorsDTO';

export default interface IDebtorsRepository {
  findByid(debtor_id: string): Promise<Debtor | undefined>;
  findByEmail(email: string): Promise<Debtor | undefined>;
  create(debtorData: ICreateDebtorsDTO): Promise<Debtor>;
  list(): Promise<Debtor[]>;
  save(debtor: Debtor): Promise<Debtor>;
}
