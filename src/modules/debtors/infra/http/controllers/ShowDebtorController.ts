import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDebtorService from '@modules/debtors/services/ShowDebtorService';

class ShowDebtorController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { debtor_id } = request.params;

    const showDebtor = container.resolve(ShowDebtorService);

    const debtor = await showDebtor.execute({
      debtor_id,
    });

    return response.json(debtor);
  }
}

export default ShowDebtorController;
