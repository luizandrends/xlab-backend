import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDebtsService from '@modules/debt/services/ListDebtsService';

class ListDebtsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listDebts = container.resolve(ListDebtsService);

    const debts = await listDebts.execute();

    return response.json(debts);
  }
}

export default ListDebtsController;
