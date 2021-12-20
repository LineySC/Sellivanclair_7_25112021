const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const multer = require('./../middleware/multer-config');

const auth = require('../middleware/auth')

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/profil/:id', auth, userController.getProfil);
router.put('/profil/:id', auth, multer.single("profil_image"), userController.modifyProfil);
router.delete('/profil/:id', auth, userController.deleteUser);

module.exports = router;
