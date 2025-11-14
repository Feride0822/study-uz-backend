const express = require('express');
const router = express.Router();
const db = require('../db');

// --- Create a new university ---
router.post('/', (req, res) => {
    const { name, short_name, country, city, website, description } = req.body;
    const sql = `INSERT INTO universities (name, short_name, country, city, website, description)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, short_name, country, city, website, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'University added successfully', id: result.insertId });
    });
});

// --- Read all universities ---
router.get('/', (req, res) => {
    db.query('SELECT * FROM universities', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- Read single university by ID ---
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM universities WHERE uni_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// --- Update university ---
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, short_name, country, city, website, description } = req.body;
    const sql = `UPDATE universities SET name=?, short_name=?, country=?, city=?, website=?, description=?
                 WHERE uni_id=?`;
    db.query(sql, [name, short_name, country, city, website, description, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'University updated successfully' });
    });
});

// --- Delete university ---
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM universities WHERE uni_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'University deleted successfully' });
    });
});

module.exports = router;
