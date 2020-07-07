import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import ListDebtorsService from './ListDebtorsService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;
let listDebtorsService: ListDebtorsService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    listDebtorsService = new ListDebtorsService(fakeDebtorRepository);
  });

  it('should be able to list all debtors', async () => {
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

    const debtors = await listDebtorsService.execute();

    expect(debtors).toEqual([debtor1, debtor2]);
  });
});
