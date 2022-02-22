import { Request, Response } from 'express';
import { matchedData, query } from 'express-validator';
import { validateRequest } from '../middleware';
import { Candidate } from '../models/Candidate.model';
import { Vote } from '../models/Vote.model';

const reqValidation = [
  query('email')
    .notEmpty()
    .withMessage('Faltó indicar tu correo electrónico')
    .isEmail()
    .withMessage('Correo electrónico inválido'),
];

const controller = async (req: Request, res: Response) => {
  const { email } = matchedData(req, { locations: ['query'] });

  const voteDoc = await Vote.findOne({ email }).populate('candidate', 'name imageUrl');

  if (voteDoc) {
    // User already voted, only send back their vote
    return res.send({ hasVoted: true, voteDoc });
  }

  // Get all of the candidates but hide the votes
  const candidates = await Candidate.find({}, { votes: 0 });
  res.send({ hasVoted: false, candidates });
};

export const getCandidatesFlow = [reqValidation, validateRequest, controller];
