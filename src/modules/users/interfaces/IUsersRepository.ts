import User from '../infra/database/entities/User';

import IUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
