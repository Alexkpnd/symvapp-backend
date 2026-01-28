import { Router } from 'express';
import * as userCtrl from "../controllers/user.controller";
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { hasAdminRole } from '../middlewares/userPriv.middleware';

const router = Router();



/**
 * @openapi
 * /users:
 *  get:
 *      summary: List of all users
 *      tags: 
 *          [Users]
 *      security: 
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Response list of users
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Empty list
 */
router.get('/', authenticate, userCtrl.getAllUsers);
/**
 * @openapi
 * /users/{id}:
 *  get:
 *      summary: Get a user
 *      tags: [Users]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: User ID
 *      responses:
 *          200:
 *              description: User Found
 *          401:
 *              description: Unauthorized 
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id', authenticate, validateObjId('id'), userCtrl.getUserById);
/**
 * @openapi
 * /users:
 *  post:
 *      summary: Create new user (Admin)
 *      tags: [Users]
 *      security:
 *          - bearerAuth:   []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                          - username
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: password
 *                          username:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          address:
 *                              type: object
 *                              properties:
 *                                  street:
 *                                      type: string
 *                                  streetNum:
 *                                      type: string
 *                                  postCode:
 *                                      type: string
 *                                  city:
 *                                      type: string
 *                                  country:
 *                                      type: string
 *                          phone:
 *                              type: array
 *                              minItems: 1
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      type:
 *                                          type: string
 *                                      phoneNum:
 *                                          type: string
 *      responses:
 *          201:
 *              description: User Created
 *          401:
 *              description: Unauthorized / No admin priviliges
 *          409:
 *              description: User with email already exists
 */
router.post('/', authenticate, hasAdminRole, validate(createUserSchema), userCtrl.createUser); //admin create
/**
 * @openapi
 * /users/{id}:
 *  put:
 *      summary: Update a user (Admin)
 *      tags: [Users]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: User ID
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                          username:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          address:
 *                              type: object
 *                              properties:
 *                                  street:
 *                                      type: string
 *                                  streetNum:
 *                                      type: string
 *                                  postCode:
 *                                      type: string
 *                                  city:
 *                                      type: string
 *                                  country:
 *                                      type: string
 *                          phone:
 *                              type: array
 *                              minItems: 1
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      type:
 *                                          type: string
 *                                      phoneNum:
 *                                          type: string
 *      responses:
 *          200:
 *              description: User updated
 *          401:
 *              description: Unauthorized / No admin priviliges
 *          500:
 *              description: Internal Server Error
 */
router.put('/update/:id',authenticate, hasAdminRole, validateObjId('id'), validate(updateUserSchema),  userCtrl.updateUser); // admin update 

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *      summary: Delete a user (Admin)
 *      tags: [Users]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: User ID
 *      responses:
 *          200:
 *              description: User delete
 *          401:
 *              description: Unauthorized / No admin priviliges
 *          500:
 *              description: Internal Server Error
 */
router.delete('/:id',authenticate, hasAdminRole, validateObjId('id'), userCtrl.removeUserById); // admin delete


export default router;