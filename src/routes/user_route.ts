import express from "express";
const router = express.Router();
import usersController from "../controllers/users_conroller";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - is_doctor
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         refreshToken:
 *           type: array
 *           description: The refresh token of the user
 *         is_doctor:
 *           type: boolean
 *           description: The user is a doctor or not
 *       example:
 *         _id: "245"
 *         email: "user@gmail.com"
 *         password: "password123456789"
 *         refreshToken: []
 *         is_doctor: false
 */

/**
 * @swagger
 * /users/is-doctor:
 *   get:
 *     summary: Check if the user is a doctor
 *     description: Check if the user is a doctor
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Get if the user is a doctor or not
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/is-doctor', usersController.isDoctor.bind(usersController));

export default router;
