import UserDB from "../schema/userSchema.js";

export const usernameExist = async (username)=>{
    const user = await UserDB.findOne({username: username});
    
    if(!user) return false;
    return user;
};
export const createUserAndSave = async (name, username, password)=>{
    const userObj = new UserDB({
        name,
        username,
        password,
    })

    try {
        await userObj.save();
        return userObj;
    } catch (error) {
        console.log(error);
        return null;
    }
};
