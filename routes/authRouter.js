import { Router } from "../config/app.js";
import { logOutController, loginController, registrationController } from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = Router();

authRouter.post('/register', registrationController)

authRouter.post('/login', loginController);

authRouter.post('/logout', isAuth, logOutController);

export default authRouter;