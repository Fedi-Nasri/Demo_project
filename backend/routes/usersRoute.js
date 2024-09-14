const {getUser, updateUser, deleteUser, getAllUsers}= require ('../controllers/usersController');
const {verfiyToken} = require('../middlewares/authMiddleware');
const express =  require('express');
const router =express.Router();

router.use(verfiyToken);

router.get('/:id',getUser);
router.put('/:id', updateUser);
router.delete('/:id',deleteUser);
router.get('/',getAllUsers);

module.exports = router;