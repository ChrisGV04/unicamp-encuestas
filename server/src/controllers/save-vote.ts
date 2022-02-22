import { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError, UnauthorizedError } from '../errors';
import { Candidate } from '../models/Candidate.model';
import { Vote } from '../models/Vote.model';

const bodyValidation = [
  body('email')
    .notEmpty()
    .withMessage('Faltó indicar tu correo electrónico')
    .isEmail()
    .withMessage('Correo electrónico inválido'),
  body('candidate')
    .notEmpty()
    .withMessage('Faltó indicar tu voto')
    .isMongoId()
    .withMessage('ID de candidato inválida'),
];

const controller = async (req: Request, res: Response) => {
  const { email, candidate } = req.body;

  const hasVoted = await Vote.findOne({ email }, { _id: 1 }).lean();
  if (hasVoted) throw new UnauthorizedError(403, 'No puedes volver a votar');

  const candidateDoc = await Candidate.findOne({ _id: candidate });
  if (!candidateDoc) throw new NotFoundError('Candidato inexistente');

  const newVote = Vote.build({ email, candidate });
  await newVote.save();

  candidateDoc.votes++;
  await candidateDoc.save();

  newVote.candidate = candidateDoc;
  res.status(201).send(newVote);
};

export const saveVoteFlow = [controller];
