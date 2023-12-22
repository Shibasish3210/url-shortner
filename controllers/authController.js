import { compare, hash } from "bcrypt";
import { createUserAndSave, usernameExist } from "../model/userModel.js";
import { createUserToken } from "../util/tokens.js";
import { validateRegistration } from "../util/cleanUpAndValidate.js";

export const registrationController = async (req, res)=>{
    const {name, username, password} = req.body;//getting the name, username and password from req body
    const SALT = +process.env.Salt || 10;//getting the salt from environment variable or setting default salt as 10

    
    try {
        await validateRegistration(name, username, password);//User Credentials Check
    } catch (error) {
        return res.status(400).send({message: error});//if validateRegistration gives us rejected promise we return the rejection cause
    }

    
    try {
        const user = await usernameExist(username);// Checking if username already exists
        if(user) return res.status(400).send({message:'Username already registered'})//returning if usename exits
        
        const hashedPassword = await hash(password, SALT);//creating encrypted password
        const userDB = await createUserAndSave(name, username, hashedPassword)//saving user in database
        
        
        //seccesfull registration and returning password less user object
        return res.status(201).send({
            message:'Registration successful',
            user:{
                name: userDB.name,
                _id: userDB._id,
                username: userDB.username
            }
        })
    } catch (error) {
        // some internal error may occour
        return res.status(500).send({ message: error.message || 'Something went wrong please try again later' });
    }
}


export const loginController = async (req, res)=>{
    const {username, password} = req.body;//extracting the username and password out of the req body
    //return missing credentials if any of the credentials is missing
    if(!username || !password) return res.status(400).send({message:`Missing credentials`});
    try {
        const user = await usernameExist(username);//checking if user Exists

        //returning a response asking the user to log in as such username doesn't exist
        if(!user) return res.status(400).send({message:`Username doesn't exist please reister first`});

        //comparing the password provided by user with the hashed password stored in db
        const decryptedPassword = await compare(password, user.password);

        //if password doesn't match returning wrong password message
        if(!decryptedPassword) return res.status(400).send({message:`Wrong password`});

        //creating object to be converted to jwt token and also to be sent to user
        const clientUser = {
            userId: user._id,
            userName: user.username,
        }
        const USER_TOKEN = createUserToken(clientUser);// creating the jwt token out of the client user obj
    
        res.cookie('USER_TOKEN', USER_TOKEN,{//setting the cookie 
            maxAge: (1000 * 60 * 60 * 60 * 24),
            httpOnly: true
        })
        res.status(200).send({//returning successful login status and message
            message: 'Login successful',
            user: clientUser
        })
    } catch (error) {

        //handling unexpected error or internal error
        res.status(500).send({ message: error.message || 'Something went wrong please try again later' });
    }
}

//since this controller will be protected by isAuth middleware we don't need to check anything for now
export const logOutController = async (req, res) => {
    res.clearCookie('USER_TOKEN');//deleting the user token saved in users cookies
    
    //returning a successful logout response
    res.status(200).send({
        message: 'logged out successfully',
    })
}