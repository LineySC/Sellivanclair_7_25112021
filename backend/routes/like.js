const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');

const auth = require('./../middleware/auth')

router.post('/:id', auth, likeController.addLike);
router.get('/', auth, likeController.getLike)

module.exports = router;