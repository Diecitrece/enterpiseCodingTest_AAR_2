import express, { Request, Response } from 'express';
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
  '@core': `${__dirname}/core`,
  '@infrastructure': `${__dirname}/infrastructure`,
});
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { HttpErrorHandler } from '@infrastructure/shared/errorHandler';
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(HttpErrorHandler);
app.get('/api', (req: Request, res: Response) => {
  res.send('Server running');
});
