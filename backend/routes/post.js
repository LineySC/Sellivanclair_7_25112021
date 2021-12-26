const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

//Middleware
const auth = require('../middleware/auth');
const upload = require('../middleware/multer-config')

router.get('/', auth, postController.getAllPosts);
router.post('/', auth, upload.single("feed_image"), postController.createPost);
router.delete('/', auth, postController.deletePost);

module.exports = router;