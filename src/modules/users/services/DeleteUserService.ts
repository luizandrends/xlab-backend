import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(user_id: string, password: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You cannot delete an unexistent user', 400);
    }

    if (!password) {
      throw new AppError(
        'You must provide the password to delete an user',
        401
      );
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError('Wrong password', 401);
    }

    user.deleted_at = new Date();

    await this.usersRepository.save(user);
  }
}

export default DeleteUserService;
