import ICreateDebtDTO from '../dtos/ICreateDebtDTO';
import Debt from '../infra/database/entities/Debt';

export default interface IDebtsRepository {
  findById(debt_id: string): Promise<Debt | undefined>;
  findByDebtor(debtor_id: string): Promise<Debt | undefined>;
  findByReason(reason: string, debtor_id: string): Promise<Debt | undefined>;
  create(debtDate: ICreateDebtDTO): Promise<Debt>;
  listDebts(): Promise<Debt[]>;
  save(debt: Debt): Promise<Debt>;
}
