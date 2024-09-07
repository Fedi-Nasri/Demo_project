import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate ();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:5000/api/auth/login', {
        email,
        password
      });
      // Assuming the response contains { token, user: { username, email } }
      const { token, user } = response.data;

      // Pass the user data as props to the Dashboard component
      navigate('/dashboard', { 
        state: { 
          username: user.name,
          email: user.email,
          token: token
        }
      });
    } catch (error) {
      console.error('Login failed', error);
    }

  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;