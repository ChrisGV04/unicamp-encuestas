import { Request, Response } from 'express';
import { param } from 'express-validator';
import { SUMMARY_PWD } from '../env';
import { validateRequest } from '../middleware';
import { Candidate } from '../models/Candidate.model';

const reqValidation = [param('pwd').equals(SUMMARY_PWD!).withMessage('Clave incorrecta')];

const controller = async (req: Request, res: Response) => {
  const candidateDocs = await Candidate.find({});
  res.send(candidateDocs);
};

/** Only users with the correct password can view the summary */
export const getSummaryFlow = [reqValidation, validateRequest, controller];
