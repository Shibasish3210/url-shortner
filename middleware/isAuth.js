import { validateToken } from "../util/tokens.js";


const errorObj = {
    message: "Please Login First",
};

const isAuth = (req, res, next)=>{
    const TOKEN = req?.cookies?.USER_TOKEN;
    if(!TOKEN) return res.status(400).send(errorObj);
    
    const user = validateToken(TOKEN);
    
    if(user){
        req.user = user;
        next();
    }else{
        return res.status(400).send(errorObj);
    }


}

export default isAuth;