import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import config from 'config'
import auth from "./Controllers/AuthMiddleware"

import indexRouter from './Controllers/IndexController';
import authController from './Controllers/AuthController';
import tasksRouter from './Controllers/TaskController';
import timeRecordController from "./Controllers/TimeRecordController";
import http from "http";

const uriTemplate = "mongodb+srv://<user>:<password>@cluster0-jhmtv.mongodb.net/<dbname>?retryWrites=true&w=majority";

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

const uri = uriTemplate
    .replace("<password>", config.get("mongodbpass"))
    .replace("<user>", config.get("mongodbuser"))
    .replace("<dbname>", config.get("mongodbname"))

const app = express();

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connnection successful!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authController);
app.use('/tasks', auth, tasksRouter);
app.use('/timeRecords', auth, timeRecordController)

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(4000);
