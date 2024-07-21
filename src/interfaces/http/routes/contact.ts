import express from "express";
import { body } from "express-validator";
import { validate, verifyToken } from "../middleware/auth";
import { ContactController } from "../controllers/ContactController";

const router = express.Router();

/**
 * @openapi
 * /api/contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     description: Create a new contact for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Created contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
router.post(
  "/contacts",
  verifyToken,
  [
    body("firstName")
      .isString()
      .isLength({ min: 2 })
      .withMessage("First Name Should be more than 2 characters"),
    body("lastName")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Last Name Should be more than 2 characters"),
  ],
  validate,
  ContactController.create
);

/**
 * @openapi
 * /api/contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Retrieve a list of contacts
 *     description: Retrieve a list of contacts for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/contacts", verifyToken, ContactController.getAll);

/**
 * @openapi
 * /api/contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get a contact by ID
 *     description: Retrieve a contact by its ID for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A contact object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get("/contacts/:id", verifyToken, ContactController.getOne);

/**
 * @openapi
 * /api/contacts/{id}:
 *   patch:
 *     tags:
 *       - Contacts
 *     summary: Update a contact
 *     description: Update a contact for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Updated contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.patch("/contacts/:id", verifyToken, ContactController.update);

/**
 * @openapi
 * /api/contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact
 *     description: Delete a contact for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete("/contacts/:id", verifyToken, ContactController.delete);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         userId:
 *           type: string
 *           description: The id of the user who owns this contact
 *         firstName:
 *           type: string
 *           description: The first name of the contact
 *         lastName:
 *           type: string
 *           description: The last name of the contact
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the contact
 */

