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



/** Below is firebase function for code submision of user and handling scenarios */


const GITHUB_API_URL = "https://api.github.com";
const GITHUB_OWNER = "Aiverex-Repo";
const GITHUB_REPO = "codereview-repo";
const GITHUB_SUBMISSIONS_DIR = "submissions"; // Folder to store user submissions

exports.submitCode = functions.https.onCall(async (data, context) => {
  const { codeContent, userId, userGitHubToken } = data;

  if (!userGitHubToken) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  try {
    // Step 1: Get the repo to commit the code to (centralized repo)
    const userRepo = await getRepo(userGitHubToken);

    // Step 2: Create or update the file with the user's code
    const fileName = `${userId}_code.js`; // Save code as userID_code.js
    await commitCodeToRepo(userRepo, fileName, codeContent, userGitHubToken);

    // Step 3: Return a success message
    return {
      success: true,
      message: `Code saved successfully as ${fileName}`,
    };
  } catch (error) {
    console.error("Error submitting code:", error);
    throw new functions.https.HttpsError("internal", "Error submitting code.");
  }
});

// Helper function to get the user's repo
const getRepo = async (token) => {
  const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
    headers: { Authorization: `token ${token}` },
  });

  return response.data.find((repo) => repo.name === GITHUB_REPO);
};

// Helper function to commit code to the centralized repo
const commitCodeToRepo = async (repo, fileName, codeContent, token) => {
  const branch = "main"; // Assuming commits are made to the main branch

  // Step 1: Get the current commit SHA to create a new commit
  const refResponse = await axios.get(
    `${GITHUB_API_URL}/repos/${repo.owner.login}/${repo.name}/git/refs/heads/${branch}`,
    { headers: { Authorization: `token ${token}` } }
  );

  const sha = refResponse.data.object.sha;

  // Step 2: Create or update the file in the repository (in the /submissions/ folder)
  const createFileResponse = await axios.put(
    `${GITHUB_API_URL}/repos/${repo.owner.login}/${repo.name}/contents/${GITHUB_SUBMISSIONS_DIR}/${fileName}`,
    {
      message: `Code submission from user ${repo.owner.login}`,
      content: Buffer.from(codeContent).toString("base64"),
      branch: branch,
      sha: sha, // Referencing the latest commit SHA
    },
    { headers: { Authorization: `token ${token}` } }
  );

  return createFileResponse.data;
};


/**  */