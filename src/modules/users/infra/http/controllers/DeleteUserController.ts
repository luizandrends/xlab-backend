import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteUserService from '@modules/users/services/DeleteUserService';

class DeleteUserController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(request.user.id, password);

    return response.json();
  }
}

export default DeleteUserController;
