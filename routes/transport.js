const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const TransportController = require('../controllers/transportController');

/**
 * @swagger
 * /transports/add:
 *   post:
 *     summary: Add New Transport
 *     tags: [Transport]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transport'
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
    TransportController.addTransport
);

/**
 * @swagger
 * /transports/all:
 *   get:
 *     summary: Get All Transport List
 *     tags: [Transport]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transport'
 *       500:
 *         description: Ошибка сервера
 */
router.get('/all', TransportController.getAllTransports);

/**
 * @swagger
 * /transports/all-active:
 *   get:
 *     summary: Get All Transport List (Active)
 *     tags: [Transport]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transport'
 *       500:
 *         description: Server error
 */
router.get('/all-active', TransportController.getAllActiveTransports);

/**
 * @swagger
 * /transports/{id}:
 *   get:
 *     summary: Get Transport By Id
 *     tags: [Transport]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID транспорта
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transport'
 *       404:
 *         description: Transport Not Found
 *       500:
 *         description: Server error
 */
router.get('/:id', 
    param('id').isNumeric().withMessage('parameter id must be a number'), 
    TransportController.getTransportById
);

/**
 * @swagger
 * /transports/update/{id}:
 *   put:
 *     summary: Update Transport Data
 *     tags: [Transport]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID транспорта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transport'
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Valid data error
 *       404:
 *         description: Transport Not Found
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
    TransportController.updateTransport
);

/**
 * @swagger
 * /transports/change-active/{id}:
 *   put:
 *     summary: Change IsActive
 *     tags: [Transport]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID транспорта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Valid data error
 *       500:
 *         description: Server error
 */
router.put('/change-active/:id', 
    param('id').isNumeric().withMessage('parameter id must be a number'),
    TransportController.updateActive
);

module.exports = router;
