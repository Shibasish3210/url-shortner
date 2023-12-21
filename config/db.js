import mongoose from "mongoose";

export const Schema = mongoose.Schema;
export const Model = mongoose.model;

//function to connect with mongo db
export const connectToDB = ()=>{

    //here the connect method takes an URI from environment variable and returns a promise
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
        // success cb after fullfilled promise
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        // consoling error
        console.log(err);
    })
}