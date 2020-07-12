import AppError from '@shared/errors/AppError';

import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';
import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';

import CreateDebtService from './CreateDebtService';
import FindDebtByReasonService from './FindDebtByReasonService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;
let findDebtsByReasonService: FindDebtByReasonService;

describe('FindDebtorByName', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();

    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    findDebtsByReasonService = new FindDebtByReasonService(fakeDebtsRepository);
  });

  it('should be able to find the debits', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const debt1 = await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(),
      value: 900,
    });

    const showDebts = await findDebtsByReasonService.execute({
      debt_reason: debt1.debt_reason,
    });

    expect(showDebts).toEqual([debt1]);
  });

  it('should not be able to show an unexistent debt', async () => {
    await expect(
      findDebtsByReasonService.execute({
        debt_reason: 'unexistent-debtor',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
