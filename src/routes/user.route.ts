import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();




router.get('/', authenticate, userCtrl.getAllUsers);
router.post('/', authenticate, validate(createUserSchema), userCtrl.createUser); //admin create
router.put('/:id',authenticate, validateObjId('id'), validate(updateUserSchema),  userCtrl.updateUser); // admin update or not
//router.put('/update/:email', authenticate, validate(updateUserSchema), userCtrl.updateUserByEmail); //alternative admin update.
router.delete('/:id',authenticate, userCtrl.removeUserById); // admin delete


export default router;