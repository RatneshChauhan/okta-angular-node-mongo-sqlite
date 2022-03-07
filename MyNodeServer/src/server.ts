import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as productRouter} from './routes/product'
import {router as noteRouter} from './routes/note'
import {oktaAuth} from './auth'
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(productRouter)
  .use(noteRouter);

app.listen(4201, () => {
 // console.log('Mongo Server:'+process.env.SERVER)
  return console.log('My Node Server listening on port 4201');
});

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});