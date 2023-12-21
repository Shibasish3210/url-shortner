import jwt from 'jsonwebtoken';


export const createUserToken = (user)=>{
    //creating a new user token which will be used to login later
    const token = jwt.sign({...user}, process.env.jwtSecret);
    
    return token;//returning a new user token
}

export const validateToken = (token) => {
    let user; // declaration of user 
    jwt.verify(token, process.env.jwtSecret, (err, decoded)=>{
        if(err){
            //if verification failed then setting user as null
            user = null;
            return;
        }

        //setting user as the decoded value if the token is verified
        user = decoded;
    });

    //returning user
    return user;
}