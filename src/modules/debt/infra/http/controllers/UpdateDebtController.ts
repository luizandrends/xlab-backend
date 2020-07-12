import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateDebtService from '@modules/debt/services/UpdateDebtService';

class CreateDebtController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { debt_id } = request.params;
    const { debtor_id, debt_reason, date, value } = request.body;

    const updateDebt = container.resolve(UpdateDebtService);

    const debt = await updateDebt.execute({
      debt_id,
      debtor_id,
      debt_reason,
      date,
      value,
    });

    return response.json(debt);
  }
}

export default CreateDebtController;
