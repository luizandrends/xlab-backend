import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDebtService from '@modules/debt/services/ShowDebtService';

class ShowDebtController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { debt_id } = request.params;

    const showDebts = container.resolve(ShowDebtService);

    const debt = await showDebts.execute({
      debt_id,
    });

    return response.json(debt);
  }
}

export default ShowDebtController;
