import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/User';

import IUsersRepository from '../interfaces/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail) {
      throw new AppError('Email already exists', 400);
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
      provider: false,
    });

    return user;
  }
}

export default CreateUserService;
