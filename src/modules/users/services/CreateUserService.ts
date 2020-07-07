import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/User';

import IUsersRepository from '../interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail) {
      throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      provider: false,
    });

    return user;
  }
}

export default CreateUserService;
