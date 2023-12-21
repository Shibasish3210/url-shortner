import dotenv from 'dotenv';
import { app, json, urlEncoded } from './config/app.js';
import { connectToDB } from './config/db.js';
import authRouter from './routes/authRouter.js';
import urlRouter from './routes/urlRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();


connectToDB();
app.use(json());
app.use(urlEncoded({extended: true}));
app.use(cookieParser());
const PORT = process.env.PORT || 3333;

app.use('/', urlRouter);
app.use('/auth', authRouter);
app.use('/*', (req, res, next)=>{
    res.status(404).send(`<h1>This ${req.originalUrl}  Page is not found</h1>`);
});

app.listen(PORT, ()=>{
    console.log(`listening on port https://localhost:${PORT}`)
});