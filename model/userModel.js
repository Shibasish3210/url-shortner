import UserDB from "../schema/userSchema.js";

export const usernameExist = async (username)=>{
    try {
        //finding in db the user with username
        const user = await UserDB.findOne({username: username});
        
        //returning the result
        return user;
    } catch (error) {
        console.log(error);
        //simulating that user is not found
        return null;
    }
};
export const createUserAndSave = async (name, username, password)=>{
    //creating user obj for db
    const userObj = new UserDB({
        name,
        username,
        password,
    })

    try {
        await userObj.save();//saving the user in db
        return userObj;//returning the userOBj
    } catch (error) {
        console.log(error);
        //if something goes wrong returning null
        return null;
    }
};
