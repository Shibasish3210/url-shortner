import express from 'express';

export const app = express();//creating express app and exporting

export const Router = express.Router;
export const json = express.json;
export const urlEncoded = express.urlencoded;