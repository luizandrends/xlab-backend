import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import AppError from '@shared/errors/AppError';
import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

import ListDebtorsDebtsService from './ListDebtorsDebtsService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

let listDebtorsDebtsService: ListDebtorsDebtsService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    listDebtorsDebtsService = new ListDebtorsDebtsService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );
  });

  it('should be able to list all debts', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const debt1 = await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(2021, 7, 7, 13),
      value: 500,
    });

    const debt2 = await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'T-Mobile bill',
      date: new Date(2021, 7, 7, 13),
      value: 500,
    });

    const debts = await listDebtorsDebtsService.execute({
      debtor_id: debtor.id,
    });

    expect(debts).toEqual([debt1, debt2]);
  });

  it('should not be able to list all debts of an unexistent debtor', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(2021, 7, 7, 13),
      value: 500,
    });

    await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'T-Mobile bill',
      date: new Date(2021, 7, 7, 13),
      value: 500,
    });

    await expect(
      listDebtorsDebtsService.execute({
        debtor_id: 'unexistent-debtor',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
