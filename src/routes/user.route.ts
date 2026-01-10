import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { hasAdminRole } from '../middlewares/userPriv.middleware';

const router = Router();




router.get('/', authenticate, userCtrl.getAllUsers);
router.get('/:id', authenticate, validateObjId('id'), userCtrl.getUserById);
router.post('/', authenticate, hasAdminRole, validate(createUserSchema), userCtrl.createUser); //admin create
router.put('/update/:id',authenticate, hasAdminRole, validateObjId('id'), validate(updateUserSchema),  userCtrl.updateUser); // admin update 
router.put('/updateme',authenticate, validate(updateUserSchema), userCtrl.updateMe);
router.delete('/:id',authenticate, hasAdminRole, validateObjId('id'), userCtrl.removeUserById); // admin delete


export default router;