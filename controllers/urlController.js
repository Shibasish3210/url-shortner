import { checkIfURLExists, checkIfURLExistsByShortID, createURLObjAndSave } from "../model/urlModel.js";
import { validateURLShortening } from "../util/cleanUpAndValidate.js";

export const urlShorteningConroller = async (req, res)=>{
    let { actualURL } = req.body;//extracting actual URL from request body

    let url, protocol;
    //validating url
    try {
        // destructuring the array if the url validation promise is fulfilled
        let [ newUrl, newProtocol ] = await validateURLShortening(actualURL);
        //setting the newURl and protocol value to be accessible outside this try block
        url = newUrl,
        protocol = newProtocol;
    } catch (error) {
        //rejected promise will return us the cause of rejection and sending that response back
        return res.status(400).send({message: error});
    }

    console.log(url, protocol);
    //checking if The actual URL is present in the db
    const storedUrl = await checkIfURLExists(url);

    if(storedUrl){
        //if present sending response
        return res.status(200).send({
            urlId: storedUrl.urlId,
            originalURL: storedUrl.originalURL,
            shortURL: storedUrl.shortURL,
        }) 
    }
    
    //creating url object for DB and storing it in the db
    const urlObj = await createURLObjAndSave(url,protocol);
    //something went wrong while saving the url object
    if(!urlObj) return res.status(500).send({message: 'Internal Server Error'});

    //successfully saved url and sending the urlobj
    res.status(200).send(urlObj);
}


export const redirectToOrgURLController = async (req, res)=>{
    const { urlID } = req.params; //extract url id from params dynamically
    
    //necessery check for if urlID is provided and if it's length is 8
    if( !urlID || urlID.length !== 8 ) return res.status(400).send({message: 'Invalid URL length'});

    const storedUrl = await checkIfURLExistsByShortID(urlID);//matching the urlID with user provided urlId

    //if stored url is not found urlID must be wrong
    if(!storedUrl){
        return res.status(400).send({message: 'Invalid URL ID'});
    } 
    
    //simulating a browser redirect if uriID is present in DB
    return res.status(200).send(`<script>window.location.href="${storedUrl.protocol}${storedUrl.originalURL}"</script>`);
}