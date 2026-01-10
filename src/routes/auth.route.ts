import { Router} from 'express';
import * as authCtrl from "../controllers/auth.controller";
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';



const router = Router();


router.post('/login', validate(loginSchema), authCtrl.login);
router.post('/register', validate(registerSchema), authCtrl.register);
router.get('/me',authenticate, authCtrl.me)

export default router;