import * as functions from 'firebase-functions';
import * as express from 'express';
import bodyParser = require('body-parser');
import { FileController } from './FileController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//upload
app.post("/api/store", FileController.store);

//download
app.get("/api/show", FileController.show);


export const api = functions.https.onRequest(app);
