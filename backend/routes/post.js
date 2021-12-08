const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

//Middleware
const auth = require('../middleware/auth');

router.get('/', auth, postController.getAllPosts);
router.post('/', auth, postController.createPost);

module.exports = router;