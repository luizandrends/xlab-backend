import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import AppError from '@shared/errors/AppError';
import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

import ShowDebtService from './ShowDebtService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

let showDebtService: ShowDebtService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    showDebtService = new ShowDebtService(fakeDebtsRepository);
  });

  it('should be able to list all debts', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const debt = await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(2021, 7, 7, 13),
      value: 500,
    });

    const showDebt = await showDebtService.execute({
      debt_id: debt.id,
    });

    expect(showDebt).toEqual(debt);
  });

  it('should not be able to list an unexistend debit', async () => {
    await expect(
      showDebtService.execute({
        debt_id: 'unexistent debit',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
