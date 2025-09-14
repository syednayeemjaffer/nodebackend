const {getAllUsers,getUserById,getUser,registerUser,imgUpload,updateUser,loginUser,deleteUser   } = require('../controllers/UserController');
const {authenticateToken,authorization} = require('../middlewares/AuthMiddleware');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/Multer');

const img = multer({storage : multerConfig});

router.post('/img',img.single('img'),imgUpload);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users',authenticateToken,authorization('ADMIN'), getAllUsers);
router.get('/users/:id',authenticateToken,authorization('ADMIN'),getUserById);
router.put('/update', authenticateToken,authorization('ADMIN'),updateUser);
router.delete('/delete', authenticateToken,authorization('ADMIN'),deleteUser);

router.get('/user',authenticateToken,getUser);

module.exports = router;