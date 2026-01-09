import { Router} from 'express';
import * as authCtrl from "../controllers/auth.controller";



const router = Router();


router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

export default router;