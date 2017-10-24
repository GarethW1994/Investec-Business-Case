import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as session from "express-session";

import { ConnectionDB } from "../db-connection/Connection";
import { createConnection } from "typeorm";

export class Server {
    public app : express.Application;

    constructor(port: number) {
        this.app = express();
        this.Config();
        this.connectDatabase();
        this.startServer(port);
    }

    Config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "public"));
        this.app.use(logger('dev'));
    }

    connectDatabase() {
        const connectionDB = new ConnectionDB();
        const dbCon = connectionDB.connectToDb();

        dbCon.then(async connection => {
            console.log('connected to DB');
            return await connection;
        })
        .catch(Error => {
            console.log(Error);
        });
    }

    startServer(port: number) {
        this.app.listen(port, () => {
            console.log('Server Running at http://localhost:' + port);
        });
    }
}
