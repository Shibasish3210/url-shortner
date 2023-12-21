import express from 'express';

export const app = express();

export const Router = express.Router;
export const json = express.json;
export const urlEncoded = express.urlencoded;