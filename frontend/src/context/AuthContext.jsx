import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken, getToken, removeToken } from '../services/tokenService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: "username",
    token: "token", // Get the token from local storage
  });
  const navigate = useNavigate();

  const login = (user, token) => {
    setAuthState({ user, token });
    saveToken(token); // Save the token to local storage
    navigate('/dashboard');
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
    removeToken();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authState,login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
