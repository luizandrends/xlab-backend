import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '@shared/infra/database';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.validationErrors();
    this.handleError();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private validationErrors(): void {
    this.express.use(errors());
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
