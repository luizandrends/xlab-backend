import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import DeleteDebtorService from './DeleteDebtorService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;
let deleteDebtorService: DeleteDebtorService;

describe('ListDebtors', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    deleteDebtorService = new DeleteDebtorService(fakeDebtorRepository);
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
    await expect(
      deleteDebtorService.execute({
        debtor_id: 'unexistent-debtor',
      })
    );
  });
});
