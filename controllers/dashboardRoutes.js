const router= require('express').Router();
const sequelize= require('../config/connection');
const {User, Blog, Comment}= require('../models');

router.get('/', (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            
        ]
    })
    res.render('dashboard', { loggedIn: true });
});

module.exports= router;