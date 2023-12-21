import { validateToken } from "../util/tokens.js";

//creating error message
const errorObj = {
    message: "Please Login First",
};

const isAuth = (req, res, next)=>{
    //check if the token is present in req cookies
    const TOKEN = req?.cookies?.USER_TOKEN;
    if(!TOKEN) return res.status(400).send(errorObj);// if no token in cookie ask user to login
    
    const user = validateToken(TOKEN);//validating token and getting decoded user
    
    if(user){
        //if token is validated attach user in the request  
        req.user = user;
        next();
    }else{
        //if the token has been tampered with or wrong
        return res.status(400).send(errorObj);
    }
}

export default isAuth;