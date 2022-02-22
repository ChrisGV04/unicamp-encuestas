import { Router } from 'express';
import { getCandidatesFlow, getSummaryFlow, saveVoteFlow } from '../controllers';
const router = Router();

router.get('/candidates', ...getCandidatesFlow);
router.get('/summary/:pwd', ...getSummaryFlow);
router.post('/save-vote', ...saveVoteFlow);

export default router;
