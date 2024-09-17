const express =require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const {OAuth2Client} = require('google-auth-library');
const {addUser} = require('../services/usersServices');

exports.getGoogleAuthUrl = async (req, res, next) => {

    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");
    const redirectURL = 'http://localhost:3000/OAuth2/google/callback';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

      // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile  openid' ,
            'https://www.googleapis.com/auth/userinfo.email'],
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})

};

async function getUserData(access_token) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    
    //console.log('response',response);
    const data = await response.json();
    //console.log('data',data);
    const userInfo ={
        email : data.email,
        name : data.name, 
        password : '123',
    };
    console.log('add to database : ', userInfo);
    //addUser(userInfo);
    return userInfo;
}; 

exports.googleOAuthCallback  = async (req,res) =>{
    const {code} = req.body;
    console.log("code is : ",req.body)
    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }
    console.log(code);

    try {
        const redirectURL = "http://localhost:3000/OAuth2/google/callback"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );

        const {tokens} =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(tokens);
        console.info('Tokens acquired.');

        const { access_token } = tokens;
        if (!access_token) {
            throw new Error('Access token not found in tokens');
        }

        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        const userinfo = await getUserData(oAuth2Client.credentials.access_token);

          // Encode user data to be safely used in query parameters
        const encodedUserData = encodeURIComponent(JSON.stringify(userinfo));
        
        // Redirect to the dashboard with access token and encoded user data
        {/* res.redirect(`http://localhost:3000/dashboard?access_token=${access_token}&user_data=${encodedUserData}`); */}
        
        // Send JSON response with redirect URL
        res.json({
            //redirectUrl: 'http://localhost:3000/oauth-callback', // The URL to redirect to
            accessToken: access_token,
            user: userinfo.name
        });
        
    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        res.status(500).send('OAuth callback failed');
    }
    
};

