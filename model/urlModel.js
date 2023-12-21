import UrlDB from "../schema/urlSchema";

export const checkIfURLExists = async (url)=>{
    const storedUrl = await UrlDB.findOne({originalUrl: url});

    return storedUrl;
}