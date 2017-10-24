import * as csv from "csvtojson";

export class FileParser {
    filePath: string = "";
    public jsonData = [];

    constructor(path: string) {
        this.filePath = path;
    }

    convert() {
         csv()
         .fromFile(this.filePath)
         .on('json', async (jsonObj)=>{
            return jsonObj;
         })
         .on('done', (error) => {
             if (error) {
                 console.log(error)
             } else {
                 console.log('extracted data succesfully...');
             }
         });
    }

   async pushData(rawData?) {
    //console.log(rawData);    
    await this.jsonData.push(rawData);
    return this.jsonData
    }

    getData() {
        console.log(this.jsonData);
       return this.jsonData;
    }
}
 