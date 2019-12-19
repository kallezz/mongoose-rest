const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({
            "articles": articles
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

// GET article by id
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.status(200).json({
           "article": article
        })
    } catch(err) {
        res.status(404).json({
            "message": err.message
        })
    }
});

// POST new article
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        body: req.body.body
    });

    try {
        const savedArticle = await article.save();
        res.status(200).json({
            "message": "New article added",
            "data": savedArticle
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

// PATCH article by id
router.patch('/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.updateOne({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title
            }
        });
        res.status(200).json({
            "message": `Post ${req.params.id} updated`,
            "data": updatedArticle
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

// DELETE article by id
router.delete('/:id', async (req, res) => {
   try {
       const removedArticle = await Article.deleteOne({
           _id: req.params.id
       });
       res.status(200).json({
           "message": `Post ${req.params.id} removed`,
           "data": removedArticle
       })
   } catch(err) {
       res.status(500).json({
           "message": err.message
       })
   }
});

module.exports = router;