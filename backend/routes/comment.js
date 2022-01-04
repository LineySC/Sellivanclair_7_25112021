const express = require('express');
const router = express.Router();
const likeController = require('../controllers/comment');

const auth = require('./../middleware/auth');

router.post('/:id', auth, likeController.postCommment);

module.exports = router;