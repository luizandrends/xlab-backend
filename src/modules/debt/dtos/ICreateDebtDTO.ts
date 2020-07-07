export default interface ICreateDebtDTO {
  debtor_id: string;
  debt_reason: string;
  date: Date;
  value: number;
}
