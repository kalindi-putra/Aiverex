const linkedInClientId = "86wnlcu4aj8j46"; // From LinkedIn Developer Portal
const redirectUri = "http://localhost:5173/mentor/auth/callback"; 

const linkedInLogin = () => {
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=foobar&scope=r_liteprofile%20r_emailaddress`;

  window.location.href = linkedInAuthUrl; // Redirect the user to LinkedIn authorization page
};
