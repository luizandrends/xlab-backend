import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteDebtService from '@modules/debt/services/DeleteDebtService';

class DeleteDebtController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { debt_id } = request.params;

    const deleteDebt = container.resolve(DeleteDebtService);

    const debt = await deleteDebt.execute({
      debt_id,
    });

    return response.json(debt);
  }
}

export default DeleteDebtController;
