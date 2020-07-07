import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';

class CreateDebtorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf } = request.body;

    const createDebtor = container.resolve(CreateDebtorService);

    const debtor = await createDebtor.execute({
      name,
      email,
      cpf,
    });

    return response.json(debtor);
  }
}

export default CreateDebtorController;
