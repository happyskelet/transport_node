const { validationResult } = require('express-validator');
const Blog = require('../models/blogModel');

exports.addArticle = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;

    Blog.addArticle(data, (err, articleId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create article' });
        }
        res.status(201).json({ id: articleId });
    });
};

exports.getBlogCategories = (req, res) => {
    Blog.getCategories((err, categories) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch articles' });
        }
        res.status(200).json(categories);
    });
};

exports.getAllArticles = (req, res) => {
    Blog.getAllArticles((err, articles) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch articles' });
        }
        res.status(200).json(articles);
    });
};

exports.getAllArticlesByCategoryId = (req, res) => {
    const category_id = req.params.category_id;
    Blog.getAllArticlesByCategoryId(category_id, (err, articles) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch articles' });
        }
        res.status(200).json(articles);
    });
};

exports.getArticleById = (req, res) => {
    const id = req.params.id;

    Blog.getArticleById(id, (err, article) => {
        if (err||!article) {
            return res.status(500).json({ error: 'Failed to fetch article' });
        }
        if (article.Length==0||!article[0]){
            return res.status(404).json({ error: 'Article Not Found' }); 
        }
        res.status(200).json(article[0]);
    });
};

exports.deleteArticle = (req, res) => {
    const id = req.params.id;

    Blog.deleteArticle(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete article' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    });
};
