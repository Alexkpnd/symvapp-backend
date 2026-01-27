import { Router } from 'express';
import * as contractCtrl from '../controllers/contract.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createContractSchema, updateContractSchema } from '../validators/contract.validator';
import { validateObjId } from '../middlewares/validateObjId.middleware';
import { hasAdminRole } from '../middlewares/userPriv.middleware';
const router = Router();

/**
 * @openapi
 * /contracts:
 *  get:
 *      summary: List of all contracts
 *      tags: 
 *          [Contracts]
 *      security: 
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Response list of contracts
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Empty list
 */
router.get('/', authenticate,  contractCtrl.findAllContracts);
/**
 * @openapi
 * /contracts/{id}:
 *  get:
 *      summary: Get a contract
 *      tags: [Contracts]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: Contract ID
 *      responses:
 *          200:
 *              description: Contract Found
 *          401:
 *              description: Unauthorized 
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id', authenticate, validateObjId("id"), contractCtrl.findContractById);
/**
 * @openapi
 * /contracts:
 *  post:
 *      summary: Create new contract
 *      tags: [Contracts]
 *      security:
 *          - bearerAuth:   []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          contractNum:
 *                              type: string
 *                          contractSeller:
 *                              type: string
 *                          contractBuyer:
 *                              type: string
 *                          contractPrice:
 *                              type: string
 *                          propertyArea:
 *                              type: string
 *                          isSigned:
 *                              type: boolean
 *      responses:
 *          201:
 *              description: Contract Created
 *          401:
 *              description: Unauthorized 
 *          409:
 *              description: contract with this number already exists
 */
router.post('/',authenticate, validate(createContractSchema), contractCtrl.createNewContract);
/**
 * @openapi
 * /contracts/{id}:
 *  put:
 *      summary: edit a contract
 *      tags: [Contracts]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: Contract ID
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          contractNum:
 *                              type: string
 *                          contractSeller:
 *                              type: string
 *                          contractBuyer:
 *                              type: string
 *                          contractPrice:
 *                              type: string
 *                          propertyArea:
 *                              type: string
 *                          isSigned:
 *                              type: boolean
 *      responses:
 *          201:
 *              description: Contract Created
 *          401:
 *              description: Unauthorized 
 *          409:
 *              description: contract with this number already exists
 */
router.put('/:id', authenticate, validateObjId('id'), validate(updateContractSchema), contractCtrl.updateContract); 
/**
 * @openapi
 * /contracts/{id}:
 *  delete:
 *      summary: Delete a contract (Admin)
 *      tags: [Contracts]
 *      security:
 *          - bearerAuth:   []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: Contract ID
 *      responses:
 *          200:
 *              description: Contracr delete
 *          401:
 *              description: Unauthorized / No admin priviliges
 *          500:
 *              description: Internal Server Error
 */
router.delete('/:id', authenticate, hasAdminRole, validateObjId('id'), contractCtrl.removeContract); //admin delete

export default router;