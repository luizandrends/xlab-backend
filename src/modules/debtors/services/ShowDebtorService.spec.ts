import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import ShowDebtorService from './ShowDebtorService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;
let showDebtorService: ShowDebtorService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    showDebtorService = new ShowDebtorService(fakeDebtorRepository);
  });

  it('should be able to show the debtor', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const showDebtor = await showDebtorService.execute({
      debtor_id: debtor.id,
    });

    expect(showDebtor.name).toEqual('John Doe');
    expect(showDebtor.email).toEqual('johndoe@gmail.com');
    expect(showDebtor.cpf).toEqual('100.200.300-40');
  });

  it('should not be able to show an unexistent debtor', async () => {
    await expect(
      showDebtorService.execute({
        debtor_id: 'unexistent-debtor',
      })
    );
  });
});
