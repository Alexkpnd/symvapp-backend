import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';

const router = Router();




router.get('/', userCtrl.getAllUsers);
router.post('/', validate(createUserSchema), userCtrl.createUser); //admin create
router.put('/:id', validate(updateUserSchema), userCtrl.updateUser); // admin update
router.put('/update/:email', validate(updateUserSchema), userCtrl.updateUserByEmail); //alternative update.
router.delete('/:id', userCtrl.removeUserById); // admin delete


export default router;