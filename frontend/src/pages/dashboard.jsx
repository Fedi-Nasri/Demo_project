import React, { useEffect, useState,useContext  } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const location = useLocation();
  const { username, email, token } = location.state || {}; // Access state safely
  const [userData, setUserData] = useState(null);
  const [token2, setToken] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();


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
//if (!userData) return <p>didn t use the GOOGLE OAUTH2 NAHH  methodeeeee AAAAAAAA</p>;
    
  if (!authState.token) {
    navigate('/login');
    return null;
  }

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
  <h2>Dashboard  login With OAuth2 google </h2>
    {authState.user ==='username' ? (  
      <p>didn t use the GOOGLE OAUTH2 NAHH  methodeeeee AAAAAAAA</p>   
    ):<div>
    <h2>Welcome, {authState.user}</h2>
    <p>assecc token : {authState.token}</p>
  </div>
  }

    
</>
  );
};

export default Dashboard;
