import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDebtorsService from '@modules/debtors/services/ListDebtorsService';

class ListDebtorsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listDebtor = container.resolve(ListDebtorsService);

    const debtors = await listDebtor.execute();

    return response.json(debtors);
  }
}

export default ListDebtorsController;
