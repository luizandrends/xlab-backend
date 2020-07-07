import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import AppError from '@shared/errors/AppError';
import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

describe('CreateDebt', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );
  });

  it('should be able to create a new debt', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const debt = await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(),
      value: 500,
    });

    expect(debt).toHaveProperty('id');
  });

  it('should not be able to create a new debt from an unexistent debtor', async () => {
    await expect(
      createDebtService.execute({
        debtor_id: 'unexistent-debtor',
        debt_reason: 'Credit card bill',
        date: new Date(),
        value: 500,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new debt with the same reason to the same user', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card bill',
      date: new Date(),
      value: 500,
    });

    await expect(
      createDebtService.execute({
        debtor_id: debtor.id,
        debt_reason: 'tua mae',
        date: new Date(),
        value: 900,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
