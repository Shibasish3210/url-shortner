import { compare, hash } from "bcrypt";
import { createUserAndSave, usernameExist } from "../model/userModel.js";
import { createUserToken } from "../util/tokens.js";
import { validateRegistration } from "../util/cleanUpAndValidate.js";

export const registrationController = async (req, res)=>{
    const {name, username, password} = req.body;
    const SALT = +process.env.Salt || 10;

    //User Credentials Check
    try {
        await validateRegistration(name, username, password);
    } catch (error) {
        return res.status(400).send({message: error})
    }

    
    try {
        const user = await usernameExist(username);// Checking if username already exists
        if(user) return res.status(400).send({message:'Username already registered'})//returning if usename exits
        
        const hashedPassword = await hash(password, SALT);//creating encrypted password
        const userDB = await createUserAndSave(name, username, hashedPassword)//saving user in database
        
        
        //seccesfull registration
        return res.status(201).send({
            message:'Registration successful',
            user:{
                name: userDB.name,
                _id: userDB._id,
                username: userDB.username
            }
        })
    } catch (error) {
        // handle any error here
        console.log(error)
        return res.status(500).send({ message: error.message || 'Something went wrong please try again later' });
    }
}


export const loginController = async (req, res)=>{
    const {username, password} = req.body;
    const SALT = +process.env.Salt || 10;
    try {
        const user = await usernameExist(username);
        if(!user) return res.status(400).send({message:`Username doesn't exist please reister first`});

        const decryptedPassword = await compare(password, user.password);
        if(!decryptedPassword) return res.status(400).send({message:`Wrong password`});

        const clientUser = {
            userId: user._id,
            userName: user.username,
        }
        const USER_TOKEN = createUserToken(clientUser);
    
        res.cookie('USER_TOKEN', USER_TOKEN,{
            maxAge: (1000 * 60 * 60 * 60 * 24),
            httpOnly: true
        })
        res.status(200).send({
            message: 'Login successful',
            user: clientUser
        })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Something went wrong please try again later' });
    }
}


export const logOutController = async (req, res) => {
    res.clearCookie('USER_TOKEN');
    res.status(200).send({
        message: 'logged out successfully',
    })
}