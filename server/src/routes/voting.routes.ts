import { Router } from 'express';
import {
  checkDuplicates,
  getCandidatesFlow,
  getSummaryFlow,
  printEmails,
  saveVoteFlow,
} from '../controllers';
const router = Router();

router.get('/candidates', ...getCandidatesFlow);
router.get('/summary/:pwd', ...getSummaryFlow);
router.post('/save-vote', ...saveVoteFlow);
router.post('/check-duplicates', checkDuplicates);
router.post('/print/:candidateId', printEmails);

export default router;
