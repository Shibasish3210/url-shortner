import { Model, Schema } from "../config/db.js";

//creating a new schema for urls
const urlSchema = new Schema({
    urlId: {
        type: "string",
        required: true,
        unique: true
    },
    originalURL: {
        type: "string",
        required: true,
    },
    shortURL:{
        type: "string",
        required: true,
    },
    protocol:{
        type: "string",
        required: true,
        default: "https://"
    }
})

// making a model out of url schema
const UrlDB = Model( 'url', urlSchema );

export default UrlDB;