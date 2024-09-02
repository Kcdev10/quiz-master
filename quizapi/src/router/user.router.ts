import { Router } from 'express';
import {
  isAuthenticatedUser,
  loginController,
  registerController,
} from '../controllers/user.controller';
import { isAuthenticateOrNot } from '../middlewares/authenticate';

const router = Router();

router.route('/authenticate').get(isAuthenticateOrNot, isAuthenticatedUser);

router.route('/login').post(loginController);
router.route('/register').post(registerController);

export default router;
