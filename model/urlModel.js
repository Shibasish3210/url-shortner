import { nanoid } from "nanoid";
import UrlDB from "../schema/urlSchema.js";

export const checkIfURLExists = async (url)=>{
    try {
        //checking if the url already exists in db
        const storedUrl = await UrlDB.findOne({originalUrl: url});
        //returning the result of previous check
        return storedUrl;
    } catch (error) {
        console.log(error);
        //if something goes wrong simulating as if the url doesn't exist and carry on
        return null;
    }
}
export const checkIfURLExistsByShortID = async (urlID)=>{
    try {
        //checking if the url already exists in db
        const storedUrl = await UrlDB.findOne({urlId: urlID});
        //returning the result of previous check
        return storedUrl;
    } catch (error) {
        console.log(error);
        //if something goes wrong simulating as if the url doesn't exist and carry on
        return null;
    }
}
export const createURLObjAndSave = async (url, protocol)=>{
    //getting the base URL from environment variables
    const BASE = process.env.Base;
    //generating unique short id's for URLs to be redirected to later
    const urlID = nanoid(8);
    
    try {
        //creating the URL obj for db
        const urlObj = {
            urlId: urlID,
            originalURL: url,
            shortURL: `${BASE}/${urlID}`,
            protocol: protocol
        }
        const newURL = new UrlDB(urlObj);
        
        await newURL.save();//saving urlobj in db

        return urlObj;//returning the url to user
    } catch (error) {
        console.log(error);
        //some error occurred so returning null
        return null;
    }
}