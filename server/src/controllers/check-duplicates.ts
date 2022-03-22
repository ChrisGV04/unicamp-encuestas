import { Request, Response } from 'express';
import { Vote } from '../models/Vote.model';

interface DuplicateAggregation {
  _id: string;
  entries: number;
  voted: any[];
  original: any;
}

export const checkDuplicates = async (req: Request, res: Response) => {
  const duplicates = await Vote.aggregate<DuplicateAggregation>([
    {
      $group: {
        _id: '$email',
        entries: { $sum: 1 },
        voted: { $addToSet: '$candidate' },
        original: { $first: '$_id' },
      },
    },
    {
      $match: { entries: { $gt: 1 } },
    },
    {
      $sort: { entries: -1 },
    },
  ]);

  let totalDeleted = 0;

  for (const duplicate of duplicates) {
    const onesToDelete = await Vote.deleteMany({
      email: duplicate._id,
      _id: { $ne: duplicate.original },
    });

    totalDeleted += onesToDelete.deletedCount;
  }

  res.send({ totalDeleted });
};
