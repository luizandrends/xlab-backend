import 'reflect-metadata';
import '@shared/infra/database';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.handleError();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(
      '/users/files',
      express.static(path.resolve(__dirname, '..', '..', '..', '..', 'tmp'))
    );
  }

  private routes(): void {
    this.express.use(routes);
  }

  private handleError(): void {
    this.express.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        // eslint-disable-next-line no-console
        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'internal server error',
        });
      }
    );
  }
}

export default new App().express;
