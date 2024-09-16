const authRoutes = require('../routes/authRoute');
const usersRoute = require('../routes/usersRoute');
const googleOAuth2 = require('./GoogleOAuthRoute')
// Use routes
module.exports = (app)=>{
    app.use('/api/auth', authRoutes);
    app.use('/OAuth2',googleOAuth2);
    app.use('/api/users',usersRoute)
}