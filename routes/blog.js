const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const BlogController = require('../controllers/blogController');

/**
 * @swagger
 * /blog/add:
 *   post:
 *     summary: Add New Article
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Success created
 *       400:
 *         description: Valid data error
 *       500:
 *         description: Server error
 */
router.post('/add', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category_id').notEmpty().isNumeric().withMessage('Category must be a number'),
    body('image').notEmpty().withMessage('Image is required')
    ], 
    BlogController.addArticle
);

/**
 * @swagger
 * /blog/categories:
 *   get:
 *     summary: Get Categories of 
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get('/categories', BlogController.getBlogCategories);

/**
 * @swagger
 * /blog/category/{id}:
 *   get:
 *     summary: Get All Article List By Category ID
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Server error
 */
router.get('/category/:category_id', BlogController.getAllArticlesByCategoryId);

/**
 * @swagger
 * /blog/all:
 *   get:
 *     summary: Get All Article List
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Server error
 */
router.get('/all', BlogController.getAllArticles);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get Article By ID
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статьи
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article Not Found
 *       500:
 *         description: Server error
 */
router.get('/:id',
    param('id').isNumeric().withMessage('parameter id must be a number'), 
    BlogController.getArticleById
);

/**
 * @swagger
 * /blog/delete/{id}:
 *   delete:
 *     summary: Удалить статью по ID
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статьи
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       500:
 *         description: Server Error
 */
router.delete('/delete/:id',
    param('id').isNumeric().withMessage('parameter id must be a number'), 
    BlogController.deleteArticle
);

module.exports = router;
