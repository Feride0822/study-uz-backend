const express = require('express');
const router = express.Router();
const db = require('../db');

// Create program
router.post('/', (req, res) => {
    const { faculty_id, name, level, duration } = req.body;
    db.query('INSERT INTO programs (faculty_id,name,level,duration) VALUES (?,?,?,?)',
        [faculty_id, name, level, duration], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Program added', id: result.insertId });
        });
});

// Get all programs
router.get('/', (req, res) => {
    db.query('SELECT * FROM programs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update program
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { faculty_id, name, level, duration } = req.body;
    db.query('UPDATE programs SET faculty_id=?, name=?, level=?, duration=? WHERE program_id=?',
        [faculty_id, name, level, duration, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Program updated' });
        });
});

// Delete program
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM programs WHERE program_id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Program deleted' });
    });
});

module.exports = router;
