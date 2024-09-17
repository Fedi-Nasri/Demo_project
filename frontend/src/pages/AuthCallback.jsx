import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchOAuthData = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code'); // Get authorization code from the URL
            console.log('the code providede :',code);
            if (code) {
                try {
                    const res = await axios.post('http://localhost:5000/OAuth2/google/callback', {
                        code, // Send the code in the request body
                    });

                    const { user, accessToken } = res.data; // Ensure the response data structure matches
                    console.log({ user, accessToken })
                    login(user, accessToken); // Set user data and token in the context
                    navigate('/dashboard'); // Redirect to dashboard
                } catch (err) {
                    console.error('OAuth authentication failed', err);
                    setError('Authentication failed. Please try again.'); // Set error message
                }
            } else {
                setError('No authorization code found in the URL.');
            }
        };

        fetchOAuthData();
    }, [navigate, login]);

    return (
        <div>
            {error ? <p>{error}</p> : <p>Logging you in...</p>} {/* Display error if any */}
        </div>
    );
};

export default AuthCallback;
