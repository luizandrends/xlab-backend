import Debtor from '../infra/database/Debtor';

import ICreateDebtorsDTO from '../dtos/ICreateDebtorsDTO';

export default interface IDebtorsRepository {
  findByid(id: string): Promise<Debtor | undefined>;
  findByCpf(name: string): Promise<Debtor | undefined>;
  create(data: ICreateDebtorsDTO): Promise<Debtor>;
  list(): Promise<Debtor[]>;
}
