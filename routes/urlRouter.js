import { nanoid } from "nanoid";
import { Router } from "../config/app.js";
import isAuth from "../middleware/isAuth.js";
import { redirectToOrgURLController, urlShorteningConroller } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post('/shorten', isAuth, urlShorteningConroller);
urlRouter.get('/:urlID',  redirectToOrgURLController);

export default urlRouter;