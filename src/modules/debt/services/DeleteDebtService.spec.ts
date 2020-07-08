import AppError from '@shared/errors/AppError';

import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

import DeleteDebtService from './DeleteDebtService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

let deleteDebtService: DeleteDebtService;

describe('DeleteDebt', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    deleteDebtService = new DeleteDebtService(fakeDebtsRepository);
  });

  it('should be able to delete an debt', async () => {
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

    await deleteDebtService.execute({
      debt_id: debt.id,
    });

    const date = debt.deleted_at;

    expect(debt.deleted_at).toEqual(date);
  });

  it('should not be able to delete an unexistent debt', async () => {
    await expect(
      deleteDebtService.execute({
        debt_id: 'non-existing debt',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
