const authRoutes = require('../routes/auth');
const authRouter = require('../oauth');
const requestRouter = require('../routes/requestOAuth');
const usersRoute = require('../routes/usersRoute');
// Use routes
module.exports = (app)=>{
    app.use('/api/auth', authRoutes);
    app.use('/oauth', authRouter);
    app.use('/request', requestRouter);
    app.use('/api/users',usersRoute)
}