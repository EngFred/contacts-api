import express from "express";
import { validateUserReg } from "../middleware/validateUserReg.js";
import { getUser, loginUser, registerUser } from "../controllers/usersController.js";
import { validateUserLogin } from "../middleware/validateUserLogin.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRouter = express.Router();

userRouter.post('/', validateUserReg, registerUser);
userRouter.post('/login', validateUserLogin, loginUser);
userRouter.get('/:id', authenticateJWT, getUser);

export default userRouter;