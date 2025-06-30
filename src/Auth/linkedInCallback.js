import { useLocation } from 'react-router-dom';

const LinkedInCallback = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');  // Get the authorization code from the URL

  // Send the authorization code to the backend
  fetch('/api/linkedin/exchange-code', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response, like storing the user info
      console.log(data);
    })
    .catch(error => {
      console.error('Error during LinkedIn authentication:', error);
    });

  return <div>Redirecting...</div>;
};
