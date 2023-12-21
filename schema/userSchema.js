import { Model, Schema } from "../config/db.js";

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

const UserDB = Model( 'user', userSchema );

export default UserDB;