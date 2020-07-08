import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    deleteUser = new DeleteUserService(fakeUsersRepository, fakeHashProvider);

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to delete an user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await fakeHashProvider.generateHash(user.password);

    await deleteUser.execute(user.id, user.password);

    const date = user.deleted_at;

    expect(user.deleted_at).toBe(date);
  });

  it('should not be able to delete an unexistent user', async () => {
    await expect(
      deleteUser.execute('unextistent-user', '12345')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete an user with a invalid password', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await fakeHashProvider.generateHash(user.password);

    await expect(
      deleteUser.execute(user.id, 'wrong password')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete an user without the password', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await fakeHashProvider.generateHash(user.password);

    await expect(deleteUser.execute(user.id, '')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
