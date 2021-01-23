const router= require('express').Router();
const {User, Blog, Comment}= require('../models');

router.get('/', (req, res) => {
  Blog.findAll({
    attributes: [
      'title',
      'created_at'
    ]
  })
  .then(Blogdata=>{
    const blogs= Blogdata.map(blog => blog.get({plain: true}));
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports= router;