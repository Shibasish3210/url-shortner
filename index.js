import dotenv from 'dotenv';
import { app, json, urlEncoded } from './config/app.js';
import { connectToDB } from './config/db.js';
import authRouter from './routes/authRouter.js';
import urlRouter from './routes/urlRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();



connectToDB();//function invokation for connecting to the database
app.use(json());//middleware for parsing JSON data
app.use(urlEncoded({extended: true}));//middleware for parsing Form data
app.use(cookieParser());//middleware for parsing cookies

//getting port from environment variable or setting default port as 3333
const PORT = +process.env.PORT || 3333;

app.use('/', urlRouter);//whichever request starts with just '/' uses the url router 

app.use('/auth', authRouter);//whichever request starts with '/auth' uses the auth router

//if the endpoint is not found
app.use('/*', (req, res, next)=>{
    res.status(404).send(`<h1>This ${req.originalUrl}  Page is not found</h1>`);
});

app.listen(PORT, ()=>{
    //cb to run after server connection is established
    console.log(`listening on port https://localhost:${PORT}`)
});