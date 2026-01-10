import { Router } from 'express';
import * as contractCtrl from '../controllers/contract.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// have to add validate zod schemas
router.get('/', authenticate, contractCtrl.findAllContracts);
router.post('/',authenticate, contractCtrl.createNewContract);
//router.put('/', authenticate, contractCtrl.updateContract); 
//router.delete('/', authenticate, contractCtrl.removeContract); //admin delete

export default router;