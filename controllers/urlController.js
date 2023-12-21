import { nanoid } from "nanoid";
import UrlDB from "../schema/urlSchema.js";
import { checkIfURLExists } from "../model/urlModel.js";

export const urlShorteningConroller = async (req, res)=>{
    const BASE = process.env.Base;
    let { url } = req.body;
    if( !url ) return res.status(400).send({message: 'url is required'});

    if(url.includes('https://')){
        url = url.slice(8);
    }
    if(url.includes('http://')){
        url = url.slice(7);
    }
    //checking if The actual URL is present in the db
    const storedUrl = await checkIfURLExists();

    if(storedUrl){
        //if present sending response
        return res.status(200).send({
            originalURL: storedUrl.originalURL,
            shortURL: storedUrl.shortURL,
        }) 
    }

    const urlID = nanoid(8);
    const urlObj = {
        urlId: urlID,
        originalURL: url,
        shortURL: `${BASE}/${urlID}`,
    }
    const newURL = new UrlDB(urlObj);

    await newURL.save();
    res.status(200).send(urlObj)
}


export const redirectToOrgURLController = async (req, res)=>{
    const { urlID } = req.params;
    console.log(req.params,1);
    
    if( !urlID || urlID.length !== 8 ) return res.status(400).send({message: 'Invalid URL length'});

    const storedUrl = await UrlDB.findOne({urlId: urlID});

    console.log(storedUrl, 2);
    
    if(!storedUrl){
        return res.status(400).send({message: 'Invalid URL ID'});
    } 
    console.log();
    return res.status(200).send(`<script>window.location.href="https://${storedUrl.originalURL}"</script>`);
}