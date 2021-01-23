const router= require('express').Router();
const {User, Blog, Comment}= require('../../models');

router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(uData => res.json(uData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Blog,
                attributes: ['title', 'content', 'user_id', 'created_at']
            },
            {
                model: Comment
            }
        ]
    }).then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(userData => {
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(userData => {
      if(!userData) {
        res.status(400).json({ message: 'No user with that name!' });
        return;
      }
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if(!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
    
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
module.exports = router;