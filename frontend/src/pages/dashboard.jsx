import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { username, email, token } = location.state || {}; // Access state safely
  const [userData, setUserData] = useState(null);
  const [token2, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access_token');
    const userDataEncoded = queryParams.get('user_data');

    if (accessToken) {
        setToken(accessToken);
    }
    
    if (userDataEncoded) {
        try {
            const decodedUserData = JSON.parse(decodeURIComponent(userDataEncoded));
            setUserData(decodedUserData);
        } catch (e) {
            console.error('Error decoding user data', e);
        }
    }
}, [location.search]);
if (!userData) return <p>didn t use the GOOGLE OAUTH2 NAHH  methodeeeee AAAAAAAA</p>;
  
  return (<>
    <h2>Dashboard email login</h2>
    {username ? (<div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {/* Render only the string representation of the token */}
      <p>Access Token: {token?.accessToken}</p>
      <p>Refresh Token: {token?.refreshToken}</p>
    </div>
      ):  <p> This methode did not been used.</p>
    }

    <div>
    <h2>Dashboard google login</h2>
    <p>Username: {userData.name}</p>
    <p>Email: {userData.email}</p>
    <p>Password: {userData.password} ||| POV:  dont worry your password is secure  </p>
    <p>Access Token: {token2}</p>
</div>
</>
  );
};

export default Dashboard;
