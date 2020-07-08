import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDebtorsDebtsService from '@modules/debt/services/ListDebtorsDebtsService';

class ListDebtorsDebtsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { debtor_id } = request.params;

    const listDebts = container.resolve(ListDebtorsDebtsService);

    const debts = await listDebts.execute({
      debtor_id,
    });

    return response.json(debts);
  }
}

export default ListDebtorsDebtsController;
