import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDebtService from '@modules/debt/services/CreateDebtService';

class CreateDebtController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { debtor_id, debt_reason, date, value } = request.body;

    const createDebt = container.resolve(CreateDebtService);

    const debt = await createDebt.execute({
      debtor_id,
      debt_reason,
      date,
      value,
    });

    return response.json(debt);
  }
}

export default CreateDebtController;
