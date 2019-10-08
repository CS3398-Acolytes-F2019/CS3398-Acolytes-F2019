import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser = require('body-parser');
import { FileController } from './FileController';
const cors = require('cors')({origin: '*'})

const app = express();

app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//upload
app.post("/store", FileController.store);

//download
app.get("/show/:fileUrl", FileController.show);


export const api = functions.https.onRequest(app);
