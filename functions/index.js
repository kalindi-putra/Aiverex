// Import necessary packages
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors')
// Replace with your JDoodle credentials
const JDoodleApiUrl = "https://api.jdoodle.com/v1/execute";
const JDoodleClientId = "507c6400712a65ebb5f87b86cae357e0";
const JDoodleClientSecret =
  "e8361f27473eee4ac2e3c44dcbeb4c8f8f04640fe5a8841763e6508a43a7b263";

// Initialize Express app
const app = express();

// Use body parser middleware to handle JSON requests
app.use(bodyParser.json());
app.use(cors());

// Route to execute code
app.post("/executeCode", async (req, res) => {
  const { code, language } = req.body;

  // Validate input
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

    // Check for errors in JDoodle response
    if (result.error) {
      return res.status(500).send({ output: result.error });
    }

    // Send the output back to the client
    return res.status(200).send({ output: result.output });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error executing code", error: error.message });
  }
});

// Set port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
