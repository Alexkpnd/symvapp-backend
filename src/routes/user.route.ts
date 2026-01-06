import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";

const router = Router();




router.get('/', userCtrl.getAllUsers);
router.post('/', userCtrl.createUser); //admin create



export default router;