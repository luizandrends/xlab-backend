import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateDebtorService from '@modules/debtors/services/UpdateDebtorService';

class UpdateDebtorController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { debtor_id } = request.params;
    const { name, email, cpf } = request.body;

    const updateDebtor = container.resolve(UpdateDebtorService);

    const debtor = await updateDebtor.execute({
      debtor_id,
      name,
      email,
      cpf,
    });

    return response.json(debtor);
  }
}

export default UpdateDebtorController;
