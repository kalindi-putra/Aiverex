import { useEffect, useState } from 'react';
import { getUserDetails } from './firebase';

function OtherPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails('user-id'); // Replace 'user-id' with the actual UID of the user
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, []);

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    );
  }

  return <p>Loading user data...</p>;
}

export default OtherPage;
