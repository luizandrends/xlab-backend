import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

import ListDebtsService from './ListDebtsService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

let listDebtsService: ListDebtsService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    listDebtsService = new ListDebtsService(fakeDebtsRepository);
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

    const debts = await listDebtsService.execute();

    expect(debts).toEqual([debt1, debt2]);
  });
});
