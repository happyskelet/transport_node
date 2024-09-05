const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const PartController = require('../controllers/partsController');

/**
 * @swagger
 * /parts/add:
 *   post:
 *     summary: Add New Parts
 *     tags: [Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       201:
 *         description: Success created
 *       400:
 *         description: Valid data error
 *       500:
 *         description: Server error
 */
router.post('/add', [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('image').notEmpty().withMessage('Image is required')
    ],
    PartController.addPart
);

/**
 * @swagger
 * /parts/all:
 *   get:
 *     summary: Get All Parts
 *     tags: [Parts]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Part'
 *       500:
 *         description: Server Error
 */
router.get('/all', PartController.getAllParts);

/**
 * @swagger
 * /parts/{id}:
 *   get:
 *     summary: Get Parts By ID
 *     tags: [Parts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID запчасти
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *       404:
 *         description: Part Not Found
 *       500:
 *         description: Server Error
 */
router.get('/:id', 
    param('id').isNumeric().withMessage('parameter id must be a number'),  
    PartController.getPartById
);

/**
 * @swagger
 * /parts/update/{id}:
 *   put:
 *     summary: Updat ePart Data
 *     tags: [Parts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID запчасти
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Valid data error
 *       500:
 *         description: Server error
 */
router.put('/update/:id', [
        param('id').isNumeric().withMessage('parameter id must be a number'),
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('image').notEmpty().withMessage('Image is required')
    ],
    PartController.updatePart
);

module.exports = router;
