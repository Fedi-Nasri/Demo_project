const {getUser, updateUser, deleteUser, getAllUsers, getUserNew}= require ('../controllers/usersController');
const {verifyToken} = require('../middlewares/authMiddleware');
const express =  require('express');
const router =express.Router();

router.use(verifyToken);

//router.get('/:id',getUser);    // old route that have all the functionality in the controller   
router.get('/:id',getUserNew);   // new route that use the user service 
router.put('/:id', updateUser);
router.delete('/:id',deleteUser);
router.get('/',getAllUsers);

module.exports = router;