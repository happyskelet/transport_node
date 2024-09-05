const { validationResult } = require('express-validator');
const Transport = require('../models/transportModel');

exports.addTransport = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let data = req.body;

    Transport.addTransport(data, (err, transportId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create transport' });
        }
        res.status(201).json({ id: transportId });
    });
};

exports.getAllTransports = (req, res) => {
    Transport.getAllTransports((err, transports) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch transports' });
        }
        res.status(200).json(transports);
    });
};

exports.getAllActiveTransports = (req, res) => {
    Transport.getAllActiveTransports((err, transports) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch transports' });
        }
        res.status(200).json(transports);
    });
};

exports.getTransportById = (req, res) => {
    let id = req.params.id;
    Transport.getTransportById(id, (err, transport) => {
        if (err||!transport) {
            return res.status(500).json({ error: 'Failed to fetch transport' });
        }
        if (transport.Length==0||!transport[0]){
            return res.status(404).json({ error: 'Transport Not Found' }); 
        }
        res.status(200).json(transport[0]);
    });
};

exports.updateTransport = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let data = req.body;
        data.id = req.params.id;
    Transport.updateTransport(data, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update transport' });
        }
        res.status(200).json({ message: 'Transport updated successfully' });
    });
};

exports.updateActive = (req, res) => {
    let active = req.body.active,
        id = req.params.id;

    Transport.updateActive(id, active, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update transport status' });
        }
        res.status(200).json({ message: 'Transport status updated successfully' });
    });
};
