const functions = require("firebase-functions");
const axios = require("axios");

// Replace with your JDoodle credentials
const JDoodleApiUrl = "https://api.jdoodle.com/v1/execute";
const JDoodleClientId = "507c6400712a65ebb5f87b86cae357e0";
const JDoodleClientSecret = "e8361f27473eee4ac2e3c44dcbeb4c8f8f04640fe5a8841763e6508a43a7b263";

// Firebase Function to execute code
exports.executeCode = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).send({ message: "Code and language are required" });
  }

  const data = {
    script: code,
    language: language, // e.g., 'python3', 'java', 'cpp'
    versionIndex: "0", // 0 for latest version
    clientId: JDoodleClientId,
    clientSecret: JDoodleClientSecret,
  };

  try {
    // Send request to JDoodle API
    const response = await axios.post(JDoodleApiUrl, data);
    const result = response.data;

    if (result.error) {
      return res.status(500).send({ output: result.error });
    }

    return res.status(200).send({ output: result.output });
  } catch (error) {
    return res.status(500).send({ message: "Error executing code", error: error.message });
  }
});
