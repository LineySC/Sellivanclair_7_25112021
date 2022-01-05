const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

const auth = require('./../middleware/auth');

router.post('/:id', auth, commentController.postCommment);
router.get('/:id', commentController.getComment);
router.delete('/', auth, commentController.deleteComment);

module.exports = router;