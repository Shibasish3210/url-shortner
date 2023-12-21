import { nanoid } from "nanoid";
import { Router } from "../config/app.js";
import isAuth from "../middleware/isAuth.js";
import { redirectToOrgURLController, urlShorteningConroller } from "../controllers/urlController.js";

const urlRouter = Router();//creating a router for url

//post endpoint for shortening the URL which is protected for authenticated users only
urlRouter.post('/shorten', isAuth, urlShorteningConroller);

//get endpoint for shortened URL to be redirected to actual URL 
urlRouter.get('/:urlID',  redirectToOrgURLController);

export default urlRouter;