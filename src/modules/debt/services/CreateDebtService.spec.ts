import FakeDebtorsRepository from '@modules/debtors/interfaces/fakes/FakeDebtorsRepository';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

import FakeDebtsRepository from '../interfaces/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

let fakeDebtorsRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebtorService;

let fakeDebtsRepository: FakeDebtsRepository;
let createDebtService: CreateDebtService;

describe('CreateDebtor', () => {
  beforeEach(() => {
    fakeDebtorsRepository = new FakeDebtorsRepository();
    createDebtorService = new CreateDebtorService(fakeDebtorsRepository);

    fakeDebtsRepository = new FakeDebtsRepository();
    createDebtService = new CreateDebtService(fakeDebtsRepository);
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
});
