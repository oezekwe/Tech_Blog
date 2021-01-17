const router= require('express').Router();
const {User, Blog, Comment}= require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        blog_id: req.body.blog_id
    })
    .then(commentData => {
        res.json(commentData);
    }).catch(err=>{
        console.log(err);
    })
});

module.exports= router;