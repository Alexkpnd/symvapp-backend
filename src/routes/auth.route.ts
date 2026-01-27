import { Router} from 'express';
import * as authCtrl from "../controllers/auth.controller";
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';



const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *      summary: Login to application
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login Success
 *          401:
 *              description: Invalid Credentials
 *          404:
 *              description: Email not Found
 */
router.post('/login', validate(loginSchema), authCtrl.login);
/**
 * @openapi
 * /auth/register:
 *  post:
 *      summary: Register to application
 *      tags: [Authentication]
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
 *              description: Register Success
 *          401:
 *              description: Required Fields missing
 *          409:
 *              description: User with email already exists
 */
router.post('/register', validate(registerSchema), authCtrl.register);
/**
 * @openapi
 * /auth/me:
 *  get:
 *      summary: get my profile
 *      tags: 
 *          [Authentication]
 *      security: 
 *          - bearerAuth:   []
 *      responses:
 *          200:
 *              description:  Success
 *          401:
 *              description: Unauthorized
 */
router.get('/me',authenticate, authCtrl.me)

export default router;