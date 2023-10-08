
const { time, timeStamp } = require("console");

const databaseName = process.env.DATABASE_NAME
const uri = process.env.MONGO_URI;
const {MongoClient, ServerApiVersion} = require('mongodb')
require('dotenv').config();
const fs = require("fs");
const { parse } = require("path");

const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});


function saveDataToFile(moisture, isSensor1) {

    fileName = "./data1.json";
    if (!isSensor1) {
        fileName = "./data2.json";
    }

    //Check if the file exists, if not, create it
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, "[]");
    }
    //Read the file
    let data = fs.readFileSync(fileName);
    //Parse the file
    let parsedData = JSON.parse(data);
    //Add the new data to the file
    let timeStamp = new Date();
    parsedData.push({ "moisture": moisture, "timestamp": timeStamp });
    //Write the file
    fs.writeFileSync(fileName, JSON.stringify(parsedData));
    //Check if the first entry data is older than 1 minutes, if so, upload the data to the database
    let firstEntry = parsedData[0];
    console.log(firstEntry);
    let now = new Date();
    let diff = now - new Date(firstEntry.timestamp);
    console.log(diff);
    if (diff > 10000) {
        uploadFileToDatabase(isSensor1);
        // Clear the file
        fs.writeFileSync(fileName, "[]");
    }

};

//Create a function that uploads the data from the file to the database
function uploadFileToDatabase(isSensor1) {


    let fileName = "./data1.json";
    if (!isSensor1) {
        fileName = "./data2.json";
    }

    let collection_name = process.env.MOISTURE1_COLLECTION_NAME;
    if (!isSensor1) {
        collection_name = process.env.MOISTURE2_COLLECTION_NAME;
    }

    //Read the file
    let data = fs.readFileSync(fileName);
    //Parse the file
    let parsedData = JSON.parse(data);
    // Connect to the MongoDB cluster
    

    try {
      db = client.db(databaseName)
      db.collection(collection_name).insertOne({data: [parsedData]})

    } catch(err){
      console.log(err)
    }

}

module.exports = {
  saveDataToFile,
}