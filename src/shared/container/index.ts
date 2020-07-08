import { container } from 'tsyringe';

import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';

import IDebtorsRepository from '@modules/debtors/interfaces/IDebtorsRepository';
import DebtorsRepository from '@modules/debtors/infra/database/repositories/DebtorRepository';

import IDebtRepository from '@modules/debt/interfaces/IDebtsRepository';
import DebtsRepository from '@modules/debt/infra/database/repositories/DebtsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IDebtorsRepository>(
  'DebtorsRepository',
  DebtorsRepository
);

container.registerSingleton<IDebtRepository>(
  'DebtsRepository',
  DebtsRepository
);
