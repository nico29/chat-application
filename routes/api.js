const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/post-controller');

router.get('/posts', async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.json({ posts });
    } catch (err) {
        res.status(500).send(err);
    }
});
