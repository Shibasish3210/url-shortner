import { Model, Schema } from "../config/db.js";

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
    }
})

const UrlDB = Model( 'url', urlSchema );

export default UrlDB;