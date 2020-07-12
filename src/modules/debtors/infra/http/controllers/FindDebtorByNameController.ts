import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindDebtorByNameService from '@modules/debtors/services/FindDebtorByNameService';

class FindDebtorByNameController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { debtor_name } = request.params;

    const findDebtor = container.resolve(FindDebtorByNameService);

    const debtor = await findDebtor.execute({
      debtor_name,
    });

    return response.json(debtor);
  }
}

export default FindDebtorByNameController;
