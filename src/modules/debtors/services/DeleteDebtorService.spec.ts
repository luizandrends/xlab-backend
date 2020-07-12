import FakeDebtRepository from '@modules/debt/interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from '@modules/debt/services/CreateDebtService';

import AppError from '@shared/errors/AppError';
import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import DeleteDebtorService from './DeleteDebtorService';

let fakeDebtorRepository: FakeDebtorsRepository;
let fakeDebtRepository: FakeDebtRepository;
let createDebtorService: CreateDebitorService;
let createDebtService: CreateDebtService;
let deleteDebtorService: DeleteDebtorService;

describe('DeleteDebtor', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();
    fakeDebtRepository = new FakeDebtRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    createDebtService = new CreateDebtService(
      fakeDebtRepository,
      fakeDebtorRepository
    );
    deleteDebtorService = new DeleteDebtorService(
      fakeDebtorRepository,
      fakeDebtRepository
    );
  });

  it('should be able to delete a debtor', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await deleteDebtorService.execute({
      debtor_id: debtor.id,
    });

    const date = debtor.deleted_at;

    expect(debtor.deleted_at).toEqual(date);
  });

  it('should not be able to delete an unexistent debtor', async () => {
    expect(
      deleteDebtorService.execute({
        debtor_id: 'unexistent-debtor',
      })
    );
  });

  it('should not be able to delete an debtor with active debts', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await createDebtService.execute({
      debtor_id: debtor.id,
      debt_reason: 'Credit card billing',
      value: 900,
      date: new Date(),
    });

    await expect(
      deleteDebtorService.execute({
        debtor_id: debtor.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
