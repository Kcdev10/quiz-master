import { Router } from 'express';
import { getQuizQuestionController } from '../controllers/quiz.controller';

const router = Router();

router.route('/question').get(getQuizQuestionController);

export default router;
