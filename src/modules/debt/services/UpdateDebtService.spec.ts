import AppError from '@shared/errors/AppError';

import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';

import CreateDebtService from './CreateDebtService';

import UpdateDebtService from './UpdateDebtService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

let updateDebtService: UpdateDebtService;

describe('UpdateDebt', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );

    updateDebtService = new UpdateDebtService(
      fakeDebtsRepository,
      fakeDebtorsRepository
    );
  });

  it('should be able to update a new debt', async () => {
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

    const updatedDebt = await updateDebtService.execute({
      debt_id: debt.id,
      debtor_id: debtor.id,
      debt_reason: 'New Reason',
      value: 700,
    });

    expect(updatedDebt.debt_reason).toEqual('New Reason');
    expect(updatedDebt.value).toEqual(700);
  });

  it('should not be able to update a debt from an unexistent debt', async () => {
    await expect(
      updateDebtService.execute({
        debt_id: 'unexistent-debit',
        debtor_id: 'user-id',
        debt_reason: 'Credit card bill',
        value: 500,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a debt from an unexistent user', async () => {
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

    await expect(
      updateDebtService.execute({
        debt_id: debt.id,
        debtor_id: 'unexistent-user',
        debt_reason: 'Credit card billing',
        value: 700,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
