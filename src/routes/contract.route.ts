import { Router } from 'express';
import * as contractCtrl from '../controllers/contract.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createContractSchema, updateContractSchema } from '../validators/contract.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
const router = Router();


router.get('/', authenticate,  contractCtrl.findAllContracts);
router.get('/:id', authenticate, validateObjId("id"), contractCtrl.findContractById);
router.post('/',authenticate, validate(createContractSchema), contractCtrl.createNewContract);
router.put('/:id', authenticate, validateObjId('id'), validate(updateContractSchema), contractCtrl.updateContract); 
router.delete('/', authenticate, contractCtrl.removeContract); //admin delete

export default router;