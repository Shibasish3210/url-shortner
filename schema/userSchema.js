import { Model, Schema } from "../config/db.js";

//making a new user schema
const userSchema = new Schema({
    name:{
        type: 'string',
        required: true,
    },
    username: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true,
    }
})

//making new model out of user schema
const UserDB = Model( 'user', userSchema );

export default UserDB;