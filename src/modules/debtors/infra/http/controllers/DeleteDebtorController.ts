import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteDebtorService from '@modules/debtors/services/DeleteDebtorService';

class DeleteDebtorController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { debtor_id } = request.params;

    const deleteDebtor = container.resolve(DeleteDebtorService);

    const debtor = await deleteDebtor.execute({
      debtor_id,
    });

    return response.json(debtor);
  }
}

export default DeleteDebtorController;
