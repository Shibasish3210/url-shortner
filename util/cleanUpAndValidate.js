export const validateRegistration = (name, username, password) => {
    return new Promise((resolve, reject)=>{
        if(!name || !username || !password) reject('Missing Credentials');//reject if any of the credentials is missing

        if(typeof name !== 'string') reject('Invalid data type for Project name');//reject if name is not a string
        if(typeof username !== 'string') reject('Invalid data type for Username');//reject if username is not a string
        if(typeof password !== 'string') reject('Invalid data type for Password');//reject if password is not a string

        if(name.length <= 3 || name.length >= 31) reject('Name must be within 4-30 characters');//reject if name's length isn't between 4-30 characters
        if(username.length <= 3 || username.length >= 31) reject('UserName must be within 4-30 characters');// reject if username's length isn't between 4-30 characters
        if(password.length <= 5 || password.length >= 21) reject('Password must be within 6-20 characters');// reject if password's length isn't between 6-20 characters

        resolve();//if all the the all of the above criteria matches resolve the promise
    })
}
export const validateURLShortening = (url) => {
    return new Promise((resolve, reject)=>{
        let protocol = 'https://'; //setting default protocol as https://

        if(!url) reject('Missing URL to shorten');// if there is no URL rejects

        if(!validateURL(url)) reject('Invalid URL');//if url is not valid rejects

        if(url.includes('https://')) url = url.slice(8);//if https:// exits cutting the procol

        if(url.includes('http://')){
            url = url.slice(7); //if http:// exits cutting the protocol
            protocol = 'http://'; //setting the protocol as http
        }

        //resolving the promise with the modified url and the protocol
        resolve([url, protocol]);
    })
}

const validateURL = (url)=>{
    //regex for http/https less urls
    const httpLessRegex = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    //regex for urls with https/http
    const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    //return if either of them are true
    return httpRegex.test(url) || httpLessRegex.test(url);
}