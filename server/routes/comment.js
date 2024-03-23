const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/profile/:profileName', commentController.getCommentsByProfile);
router.patch('/:id/like', commentController.likeComment);

module.exports = router;
