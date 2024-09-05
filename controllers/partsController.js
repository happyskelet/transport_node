const { validationResult } = require('express-validator');
const Parts = require('../models/partsModel');

exports.addPart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    Parts.addPart(data, (err, partId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create part' });
        }
        res.status(201).json({ id: partId });
    });
};

exports.getAllParts = (req, res) => {
    Parts.getAllParts((err, parts) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch parts' });
        }
        res.status(200).json(parts);
    });
};

exports.getPartById = (req, res) => {
    const id = req.params.id;

    Parts.getPartById(id, (err, part) => {
        if (err||!part) {
            return res.status(500).json({ error: 'Failed to fetch parts' });
        }
        if (part.Length==0||!part[0]){
            return res.status(404).json({ error: 'Parts Not Found' }); 
        }
        res.status(200).json(part[0]);
    });
};

exports.updatePart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let data = req.body;
        data.id = req.params.id;

    Parts.updatePart(data, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update part' });
        }
        res.status(200).json({ message: 'Part updated successfully' });
    });
};
