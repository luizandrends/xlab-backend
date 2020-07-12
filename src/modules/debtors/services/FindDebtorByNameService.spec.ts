import AppError from '@shared/errors/AppError';

import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import FindDebtorByNameService from './FindDebtorByNameService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;
let findDebtorByName: FindDebtorByNameService;

describe('FindDebtorByName', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    findDebtorByName = new FindDebtorByNameService(fakeDebtorRepository);
  });

  it('should be able to find the debtor', async () => {
    const debtor1 = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const debtor2 = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe2@gmail.com',
      cpf: '500.600.700-80',
    });

    const showDebtor = await findDebtorByName.execute({
      debtor_name: debtor1.name,
    });

    expect(showDebtor).toEqual([debtor1, debtor2]);
  });

  it('should not be able to show an unexistent debtor', async () => {
    await expect(
      findDebtorByName.execute({
        debtor_name: 'unexistent-debtor',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
