/* eslint-disable max-len */
/* eslint-disable camelcase */

const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

admin.initializeApp();

exports.linkedInAuth = onRequest(async (req, res) => {
  try {
    const {code} = req.query;
    // Get the LinkedIn authorization code from the query parameter

    if (!code) {
      return res.status(400).send("Authorization code is missing");
    }

    // LinkedIn API endpoint to exchange authorization code for an access token
    const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "your-redirect-uri", // Replace with your redirect URI
      client_id: "", // Replace with your LinkedIn client ID
      client_secret: "", // Replace with your LinkedIn client secret
    });

    // Send a POST request to LinkedIn to get the access token
    const response = await axios.post(tokenUrl, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const {access_token} = response.data;

    // Use the access token to get the user's LinkedIn profile
    const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const linkedInUser = profileResponse.data;

    // Create a Firebase custom token with LinkedIn user data
    const firebaseToken = await admin.auth().createCustomToken(linkedInUser.id, {
      email: linkedInUser.emailAddress, // Use LinkedIn email or any other details
      displayName: linkedInUser.localizedFirstName + " " + linkedInUser.localizedLastName,
    });

    // Send the Firebase token back to the client
    return res.status(200).send({firebaseToken});
  } catch (error) {
    console.error("Error during LinkedIn auth:", error);
    return res.status(500).send("Internal Server Error");
  }
});


// JDOODLE secret key and id
const jdoodleID="5b822336200ba36a0be0640f7a3a3624";
const jdooddleSecret="2f18c56bd018371cfd79c34889ffa48b73508ac4377a3dc2fdb0612a6d526db0";
const apiUrl="https://api.jdoodle.com/v1/execute";

exports.executecode=functions.https.onCall(async (req, res)=>{
  try {
    logger.log("Excecuting code");

    const {code, language}=req.data;
    if (!code || !language) {
      return ("Code or language is not specified");
    }

    const jdoodle_request={
      cliendID: jdoodleID,
      clientSecret: jdooddleSecret,
      script: code,
      language: language,
    };

    const response=await axios.post(apiUrl, jdoodle_request);

    if (response.data.error) {
      return res.json({"Error executing code": response.data.error}).status(500);
    }

    return res.json(response.data);
  } catch (error) {
    console.log(error);

    return res.json({"Internal Error": error}).status(500);
  }
});

const s3 = new S3Client({
  accessKeyId: "YOUR_AWS_ACCESS_KEY",
  secretAccessKey: "YOUR_AWS_SECRET_KEY",
  region: "us-west-1",
});
const BUCKET_NAME = "your-s3-bucket-name";

exports.submitCode = functions.https.onCall(async (data, context) => {
  const {codeContent, userId} = data;

  if (!context.auth) {
  throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  try {
    // Step 1: Upload the code to S3 (store it in your S3 bucket)
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: `user-${userId}-code-${Date.now()}.txt`, 
      // Store with a unique key based on userId and timestamp
      Body: codeContent,
      ContentType: "text/plain",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    return {success: true, message: "Code submitted successfully to S3!"};
  } catch (error) {
    console.error("Error in submitting code:", error);
    throw new functions.https.HttpsError("internal", error.message || "Error submitting code to S3");
  }
});
