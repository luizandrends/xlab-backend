import AppError from '@shared/errors/AppError';
import FakeDebtorsRepository from '../interfaces/fakes/FakeDebtorsRepository';

import CreateDebitorService from './CreateDebtorService';
import UpdateDebtorService from './UpdateDebtorService';

let fakeDebtorRepository: FakeDebtorsRepository;
let createDebtorService: CreateDebitorService;
let updateDebtorService: UpdateDebtorService;

describe('UpdateDebtor', () => {
  beforeEach(() => {
    fakeDebtorRepository = new FakeDebtorsRepository();

    createDebtorService = new CreateDebitorService(fakeDebtorRepository);
    updateDebtorService = new UpdateDebtorService(fakeDebtorRepository);
  });

  it('should be able to update a new debtor', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    const updateDebtor = await updateDebtorService.execute({
      debtor_id: debtor.id,
      name: 'Dohn Joe',
      email: 'dohnjoe@gmail.com',
      cpf: '500.600.700-80',
    });

    expect(updateDebtor.name).toEqual('Dohn Joe');
    expect(updateDebtor.email).toEqual('dohnjoe@gmail.com');
    expect(updateDebtor.cpf).toEqual('500.600.700-80');
  });

  it('should not be able to update a debtor with an existent email', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    expect(
      updateDebtorService.execute({
        debtor_id: debtor.id,
        name: 'Dohn Joe',
        email: 'johndoe@gmail.com',
        cpf: '500.600.700-80',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a debtor with an existent cpf', async () => {
    const debtor = await createDebtorService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '100.200.300-40',
    });

    expect(
      updateDebtorService.execute({
        debtor_id: debtor.id,
        name: 'Dohn Joe',
        email: 'dohnjoe@gmail.com',
        cpf: '100.200.300-40',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
