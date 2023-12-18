/* const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp();

const storage = admin.storage();
// eslint-disable-next-line max-len
const bucket = storage.bucket("sillylittlefiles.appspot.com"); // Update with
your project ID

app.get("/listFiles", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();

    const fileNames = files.map((file) => {
      return file.name;
    });

    res.json(fileNames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.api = functions.https.onRequest(app);
*/
