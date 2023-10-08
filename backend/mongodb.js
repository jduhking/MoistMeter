const { MongoClient, ServerApiVersion } = require('mongodb');
const { time, timeStamp } = require("console");
require('dotenv').config();
const fs = require("fs");
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  
//Create a function that saves data to a temporary file, when the file reaches a certain size, it will be uploaded to the database
//This is to prevent the database from being overloaded with data
//The function will be called every time a message is recieved from the broker
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
        //Clear the file
        fs.writeFileSync(fileName, "[]");
    }

};

//Create a function that uploads the data from the file to the database
function uploadFileToDatabase(isSensor1) {
    let fileName = "./data1.json";
    if (!isSensor1) {
        fileName = "./data2.json";
    }

    let collection_name = "sensor1";
    if (!isSensor1) {
        collection_name = "sensor2";
    }

    //Read the file
    let data = fs.readFileSync(fileName);
    //Parse the file
    let parsedData = JSON.parse(data);
    // Connect to the MongoDB cluster
    client.connect(uri, { useUnifiedTopology: true })
      .then((client) => {
        console.log('Connected to MongoDB');

        // Get a reference to the database and collection
        const db = client.db("moisture");
        const collection = db.collection(collection_name);

        // Insert the data into the collection
        collection.insertMany(parsedData, (err, result) => {
          if (err) {
            console.error("Error inserting data into MongoDB:", err);
          } else {
            console.log("Number of documents inserted: " + result.insertedCount);
          }

          // Close the MongoDB client connection
          client.close();
        });
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });

}

// Function to save data to file and upload to MongoDB
second = 0;
function saveAndUploadData() {
    saveDataToFile(10, true);
    saveDataToFile(20, false);
    second++;
    console.log(second);
}

function sleep(num) {
    let now = new Date();
    let stop = now.getTime() + num;
    while(true) {
        now = new Date();
        if(now.getTime() > stop) return;
    }
}





