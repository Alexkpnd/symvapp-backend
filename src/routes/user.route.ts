import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";

const router = Router();




router.get('/', userCtrl.getAllUsers);
router.post('/', userCtrl.createUser); //admin create
router.put('/:id', userCtrl.updateUser); // admin update
router.put('/update/:email', userCtrl.updateUserByEmail); //alternative update.
router.delete('/:id', userCtrl.removeUserById);


export default router;