import { Request, Response } from 'express';
import { Vote } from '../models/Vote.model';

export const printEmails = async (req: Request, res: Response) => {
  const { candidateId } = req.params;
  const allVotes = await Vote.find({ candidate: candidateId }, { email: 1 });
  res.send({ all: allVotes.map((doc) => doc.email) });
};
