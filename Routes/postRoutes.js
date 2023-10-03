const express = require('express');
const router = express.Router();
const Post = require('../Models/postSchema'); 


router.post('/api/posts', (req, res) => {
  const { title, content, category_id } = req.body;

  const newPost = new Post({
    title,
    content,
    category_id,
  });

  newPost.save((err, post) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating post' });
    } else {
      console.log('New post saved:', post);
      res.status(201).json({ message: 'Post created successfully', post });
    }
  });
});

router.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
  
    Post.findById(postId, (err, post) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving post' });
      } else if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ post });
      }
    });
  });

  router.put('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true },
      (err, updatedPost) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error updating post' });
        } else if (!updatedPost) {
          res.status(404).json({ error: 'Post not found' });
        } else {
          res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
        }
      }
    );
  });


  router.delete('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
  
    Post.findByIdAndDelete(postId, (err, deletedPost) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting post' });
      } else if (!deletedPost) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ message: 'Post deleted successfully' });
      }
    });
  });

  router.get('/api/posts/latest', (req, res) => {
    Post.aggregate([
      {
        $group: {
          _id: '$category_id',
          latestPost: { $last: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestPost' },
      },
    ]).exec((err, latestPosts) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving latest posts' });
      } else {
        res.status(200).json({ latestPosts });
      }
    });
  });

module.exports = router;