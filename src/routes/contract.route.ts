import { Router } from 'express';
import * as contractCtrl from '../controllers/contract.controller';

const router = Router();


router.get('/', contractCtrl.findAllContracts);
//router.post('/', contractCtrl.createNewContract);


export default router;