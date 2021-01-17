const router= require('express').Router();
const {User, Blog, Comment}= require('../../models');

router.get('/', (req, res)=>{
    Blog.findAll({
        include: [
            {
                model: Comment
            }
        ]
    })
    .then(blogData => res.json(blogData))
    .catch(err => {
        console.log(err);
    });
});

router.get('/:id', (req, res)=>{
    Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment
            }
        ]
    })
    .then(blogData => {
        if(!blogData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(blogData);
    })
    .catch(err => {
        console.log(err);
    });
});

router.post('/', (req, res)=>{
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
    })
    .then(blogData => {
        res.json(blogData);
    })
    .catch(err => {
        console.log(err);
    });
});

router.put('/:id', (req, res)=>{
    Blog.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(blogData => {
        if(!blogData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(blogData);
    })
    .catch(err => {
        console.log(err);
    });
});

router.delete('/:id', (req, res)=>{
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(blogData => {
        if(!blogData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(blogData);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports= router;