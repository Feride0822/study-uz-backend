const express = require('express');
const router = express.Router();
const db = require('../db');

// Create faculty
router.post('/', (req, res) => {
    const { uni_id, name, dean } = req.body;
    db.query('INSERT INTO faculties (uni_id,name,dean) VALUES (?,?,?)',
        [uni_id, name, dean], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Faculty added', id: result.insertId });
        });
});

// Get all faculties
router.get('/', (req, res) => {
    db.query('SELECT * FROM faculties', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update faculty
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { uni_id, name, dean } = req.body;
    db.query('UPDATE faculties SET uni_id=?, name=?, dean=? WHERE faculty_id=?',
        [uni_id, name, dean, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Faculty updated' });
        });
});

// Delete faculty
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM faculties WHERE faculty_id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Faculty deleted' });
    });
});

module.exports = router;
