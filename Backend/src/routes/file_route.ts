import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authMiddleware } from "../controllers/auth_controller";

const router = express.Router();
const base = `${process.env.DOMAIN_BASE}:${process.env.PORT}/`;


const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const userId = req.params.userId; 

    if (!userId) {
      return cb(new Error("Unauthorized"), "");
    }

    const userDir = path.join(__dirname, "../../public", userId);
    console.log(userDir);

    if (!fs.existsSync(userDir)) {
        console.log("creating directory")
        fs.mkdirSync(userDir, { recursive: true });
    }

    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File upload operations
 */

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file and returns its URL
 *     tags:
 *       - File
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "http://localhost:5000/public/user123/1709678500000.png"
 *       400:
 *         description: Bad request, no file uploaded
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const userId = req.params.userId;
  res.status(200).send({ url: `${base}public/${userId}/${req.file.filename}` });
});

export default router;
