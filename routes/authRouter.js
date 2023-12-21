import { Router } from "../config/app.js";
import { logOutController, loginController, registrationController } from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = Router();//creating a router for url

// post endpoint for registration of the user to use this service
authRouter.post('/register', registrationController)


//post endpoint for logging the user in to use this service
authRouter.post('/login', loginController);

//post endpoint for logging the user out 
authRouter.post('/logout', isAuth, logOutController);

export default authRouter;