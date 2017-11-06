import { Server } from "./server/Server";
import { Routes } from "./routes/Routes";

// DataModeling
import { AddingData } from "./data-modeling/AddingData";

// typeorm
import { Entity, getManager, getRepository, Connection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { FileParser } from './csv-converter/FileParser';
import { Converter } from 'csvtojson';

// classes instance
var AppRoutes = new Routes();

// server instance
var server = new Server(3000);

//Grant access to the resources to web browers
//specify what they can and can't do
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        return res.status(200).json({});
    }
    next();
});

//routes
server.app.get("/api/limits", AppRoutes.getLimits);
server.app.get("/api/entity", AppRoutes.getEntity);
server.app.get("/api/relationship", AppRoutes.getRelationship);
server.app.get("/api/parent_entity", AppRoutes.getParentEntity);
server.app.get("/api/child_entity", AppRoutes.getChildEntity);

server.app.get("/importCSV", async (req: Request, res: Response, next: NextFunction) => {
  let addingData = new AddingData();

  //   let connection = server.connectDatabase;
    // addingData.LimitsConverter();
    // await addingData.EntitiesConverter();
    // await addingData.EntityRelationshipConverter();
    await addingData.LimitsConverter();
    // await addingData.FacilityConverter();
  // await addingData.ChildEntityConverter();


     res.send("Success");
});
