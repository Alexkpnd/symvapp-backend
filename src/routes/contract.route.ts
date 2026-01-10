import { Router } from 'express';
import * as contractCtrl from '../controllers/contract.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createContractSchema, updateContractSchema } from '../validators/contract.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
import { hasAdminRole } from '../middlewares/userPriv.middleware';
const router = Router();


router.get('/', authenticate,  contractCtrl.findAllContracts);
router.get('/:id', authenticate, validateObjId("id"), contractCtrl.findContractById);
router.post('/',authenticate, validate(createContractSchema), contractCtrl.createNewContract);
router.put('/:id', authenticate, validateObjId('id'), validate(updateContractSchema), contractCtrl.updateContract); 
router.delete('/:id', authenticate, hasAdminRole, validateObjId('id'), contractCtrl.removeContract); //admin delete

export default router;