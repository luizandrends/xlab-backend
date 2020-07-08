import AppError from '@shared/errors/AppError';

import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;

describe('CreateDebtor', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
  });

  it('should be able to create a new debtor', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    expect(debtor).toHaveProperty('id');
  });

  it('should not be able to create a new debtor using an existing email', async () => {
    await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await expect(
      createDebtorService.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        cpf: '100.200.300-40',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new debtor using an existing cpf', async () => {
    await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    await expect(
      createDebtorService.execute({
        name: 'John Doe',
        email: 'johndoe2@gmail.com',
        cpf: '100.200.300-40',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
