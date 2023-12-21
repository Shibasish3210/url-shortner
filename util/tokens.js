import jwt from 'jsonwebtoken';


export const createUserToken = (user)=>{
    console.log(process.env.jwtSecret)
    const token = jwt.sign({...user}, process.env.jwtSecret);
    
    return token;
}

export const validateToken = (token) => {
    console.log(process.env.jwtSecret)
    let user;
    jwt.verify(token, process.env.jwtSecret, (err, decoded)=>{
        if(err){
            user = null;
            console.log(err,1);
            return;
        }

        user = decoded;
    });
    return user;
}