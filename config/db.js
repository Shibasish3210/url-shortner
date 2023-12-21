import mongoose from "mongoose";

export const Schema = mongoose.Schema;

export const Model = mongoose.model;

export const connectToDB = ()=>{
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.log(err);
    })
}