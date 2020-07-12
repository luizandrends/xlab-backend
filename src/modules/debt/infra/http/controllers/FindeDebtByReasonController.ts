import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindDebtByReasonService from '@modules/debt/services/FindDebtByReasonService';

class FinDebtByReasonController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { debt_reason } = request.params;

    const finDebts = container.resolve(FindDebtByReasonService);

    const debt = await finDebts.execute({
      debt_reason,
    });

    return response.json(debt);
  }
}

export default FinDebtByReasonController;
